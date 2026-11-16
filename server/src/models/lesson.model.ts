import { Schema, Types, model, type InferSchemaType } from "mongoose";

const lessonSchema = new Schema(
  {
    course: { type: Types.ObjectId, ref: "Course", required: true },
    courseSlug: { type: String, required: true },
    slug: { type: String, required: true },
    title: { type: String, required: true },
    order: { type: Number, required: true },
    minutes: { type: Number, required: true },
    /** Lesson body in Markdown (GitHub flavoured, fenced code blocks). */
    content: { type: String, required: true },
  },
  { timestamps: true },
);

lessonSchema.index({ courseSlug: 1, slug: 1 }, { unique: true });
lessonSchema.index({ course: 1, order: 1 });

export type Lesson = InferSchemaType<typeof lessonSchema>;
export const LessonModel = model("Lesson", lessonSchema);
