/**
 * Loads the course catalog and lesson Markdown into MongoDB.
 * Safe to run repeatedly: courses and lessons are upserted by slug,
 * and lessons that were removed from a file are deleted.
 *
 *   npm run seed -w server
 */
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { connectDB, disconnectDB } from "../config/db.js";
import { env } from "../config/env.js";
import { CourseModel } from "../models/course.model.js";
import { LessonModel } from "../models/lesson.model.js";
import { catalog } from "./course-catalog.js";

const CONTENT_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../content/courses");

/** Each lesson starts with: <!-- lesson: slug | Title | minutes --> */
const LESSON_MARKER = /^<!--\s*lesson:\s*([a-z0-9-]+)\s*\|\s*(.+?)\s*\|\s*(\d+)\s*-->\s*$/gm;

interface ParsedLesson {
  slug: string;
  title: string;
  minutes: number;
  content: string;
}

export function parseLessons(markdown: string, file: string): ParsedLesson[] {
  const markers = [...markdown.matchAll(LESSON_MARKER)];
  if (markers.length === 0) throw new Error(`${file}: no lesson markers found`);

  const lessons = markers.map((m, i) => {
    const start = m.index! + m[0].length;
    const end = markers[i + 1]?.index ?? markdown.length;
    return { slug: m[1]!, title: m[2]!, minutes: Number(m[3]), content: markdown.slice(start, end).trim() };
  });

  const seen = new Set<string>();
  for (const l of lessons) {
    if (seen.has(l.slug)) throw new Error(`${file}: duplicate lesson slug "${l.slug}"`);
    if (!l.content) throw new Error(`${file}: lesson "${l.slug}" is empty`);
    seen.add(l.slug);
  }
  return lessons;
}

async function main() {
  // Parse everything first so a broken file never leaves the DB half-updated.
  const parsed = await Promise.all(
    catalog.map(async (course) => {
      const file = path.join(CONTENT_DIR, `${course.slug}.md`);
      const lessons = parseLessons(await readFile(file, "utf8"), path.basename(file));
      return { course, lessons };
    }),
  );

  await connectDB(env.MONGODB_URI);

  for (const [order, { course, lessons }] of parsed.entries()) {
    const doc = await CourseModel.findOneAndUpdate(
      { slug: course.slug },
      {
        $set: {
          ...course,
          popular: course.popular ?? false,
          order,
          published: true,
          lessons: lessons.map(({ slug, title, minutes }) => ({ slug, title, minutes })),
        },
      },
      { upsert: true, returnDocument: "after", runValidators: true },
    );

    await LessonModel.bulkWrite(
      lessons.map((lesson, i) => ({
        updateOne: {
          filter: { courseSlug: course.slug, slug: lesson.slug },
          update: { $set: { ...lesson, course: doc._id, courseSlug: course.slug, order: i } },
          upsert: true,
        },
      })),
    );
    const removed = await LessonModel.deleteMany({
      courseSlug: course.slug,
      slug: { $nin: lessons.map((l) => l.slug) },
    });

    const minutes = lessons.reduce((sum, l) => sum + l.minutes, 0);
    console.log(
      `✓ ${course.title.padEnd(28)} ${lessons.length} lessons, ${minutes} min` +
        (removed.deletedCount ? ` (removed ${removed.deletedCount} old)` : ""),
    );
  }

  // Unpublish courses that are no longer in the catalog (keeps learners' enrollments intact).
  const slugs = catalog.map((c) => c.slug);
  const hidden = await CourseModel.updateMany({ slug: { $nin: slugs } }, { $set: { published: false } });
  if (hidden.modifiedCount) console.log(`Unpublished ${hidden.modifiedCount} course(s) not in the catalog`);

  await disconnectDB();
}

main().catch(async (err) => {
  console.error("Seed failed:", err instanceof Error ? err.message : err);
  await disconnectDB().catch(() => {});
  process.exit(1);
});
