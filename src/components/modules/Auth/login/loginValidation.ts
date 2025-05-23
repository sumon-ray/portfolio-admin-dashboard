import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid Email Address"),
  password: z
    .string({ required_error: "Password is required" })
    .min(6, "password must be at least 8 characters")
    .max(50, "Password must be between 8 and 50 characters"),
    rememberMe: z
    .boolean().optional(),
});
