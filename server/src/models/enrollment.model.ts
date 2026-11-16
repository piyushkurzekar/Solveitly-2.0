import { Schema, Types, model, type InferSchemaType } from "mongoose";

const enrollmentSchema = new Schema(
  {
    user: { type: Types.ObjectId, ref: "User", required: true },
    course: { type: Types.ObjectId, ref: "Course", required: true },
    /** Slugs of lessons the learner marked as complete. */
    completedLessons: { type: [String], default: [] },
    lastLessonSlug: { type: String, default: null },
    completedAt: { type: Date, default: null },
  },
  { timestamps: true },
);

enrollmentSchema.index({ user: 1, course: 1 }, { unique: true });

export type Enrollment = InferSchemaType<typeof enrollmentSchema>;
export const EnrollmentModel = model("Enrollment", enrollmentSchema);
