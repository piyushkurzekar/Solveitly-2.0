import { z } from "zod";

// Keep in sync with server/src/modules/auth/auth.schema.ts
const email = z.string().trim().toLowerCase().pipe(z.email("Enter a valid email address"));

export const registerSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(80),
  email,
  age: z.coerce
    .number<string>({ error: "Enter your age" })
    .int("Age must be a whole number")
    .min(1, "Enter a valid age")
    .max(120, "Enter a valid age"),
  password: z.string().min(8, "Password must be at least 8 characters").max(72),
});

export const loginSchema = z.object({
  email,
  password: z.string().min(1, "Password is required"),
});

export type RegisterFormValues = z.input<typeof registerSchema>;
export type RegisterInput = z.output<typeof registerSchema>;
export type LoginFormValues = z.input<typeof loginSchema>;
export type LoginInput = z.output<typeof loginSchema>;
