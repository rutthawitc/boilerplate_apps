import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginFormType = z.infer<typeof loginSchema>;

export type LoginError = {
  field: string;
  message: string;
}

export type LoginResponse = {
  success: boolean;
  errors?: LoginError[];
}
