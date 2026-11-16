import { Schema, model, type HydratedDocument, type InferSchemaType } from "mongoose";

export const COURSE_CATEGORIES = ["Web Development", "Programming", "Cloud & DevOps", "Databases"] as const;
export const COURSE_LEVELS = ["Beginner", "Intermediate", "Advanced"] as const;

const lessonSummarySchema = new Schema(
  {
    slug: { type: String, required: true },
    title: { type: String, required: true },
    minutes: { type: Number, required: true },
  },
  { _id: false },
);

const courseSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, trim: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    overview: { type: String, required: true },
    category: { type: String, enum: COURSE_CATEGORIES, required: true },
    level: { type: String, enum: COURSE_LEVELS, default: "Beginner" },
    image: { type: String, required: true },
    imageAlt: { type: String, default: "" },
    popular: { type: Boolean, default: false },
    outcomes: { type: [String], default: [] },
    /** Ordered outline; full lesson bodies live in the Lesson collection. */
    lessons: { type: [lessonSummarySchema], default: [] },
    order: { type: Number, default: 0 },
    published: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export type Course = InferSchemaType<typeof courseSchema>;
export type CourseDocument = HydratedDocument<Course>;
export const CourseModel = model("Course", courseSchema);
