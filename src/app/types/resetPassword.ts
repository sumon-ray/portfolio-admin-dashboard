import { z } from "zod";

export const resetPasswordSchema = z.object({
  newPassword: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

export type ResetPasswordType = z.infer<typeof resetPasswordSchema>;


export type ResetPasswordPayload = {
    userId: string;
    token: string;
    newPassword: string;
  };