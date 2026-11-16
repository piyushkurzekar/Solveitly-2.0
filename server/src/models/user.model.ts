import { Schema, model, type HydratedDocument, type InferSchemaType } from "mongoose";

export const USER_ROLES = ["student", "instructor", "admin"] as const;
export type UserRole = (typeof USER_ROLES)[number];

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 80 },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    age: { type: Number, required: true, min: 1, max: 120 },
    // Never returned by default; use .select("+password") when it is needed.
    password: { type: String, required: true, select: false },
    role: { type: String, enum: USER_ROLES, default: "student" },
  },
  { timestamps: true },
);

export type User = InferSchemaType<typeof userSchema>;
export type UserDocument = HydratedDocument<User>;

export const UserModel = model("User", userSchema);

/** Shape of a user that is safe to send to the client. */
export interface PublicUser {
  id: string;
  name: string;
  email: string;
  age: number;
  role: UserRole;
  createdAt: Date;
}

export function toPublicUser(user: UserDocument): PublicUser {
  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    age: user.age,
    role: user.role as UserRole,
    createdAt: user.createdAt,
  };
}
