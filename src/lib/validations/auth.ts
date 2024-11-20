import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const pwa_loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  pwd: z.string().min(1, "Password is required"),
});

export type LoginFormType = z.infer<typeof pwa_loginSchema>;

export type LoginError = {
  field: string;
  message: string;
}

export type LoginResponse = {
  success: boolean;
  errors?: LoginError[];
}

export type UserRole = {
  id: number;
  created_at?: string;
  name: string;
  role: string;
  status: boolean;
  islocked: boolean;
}

export type BannedUser = {
  id: number;
  name: string;
  desc: string;
  created_at: string;
}

export type PWAUserResponse = {
  status: string;
  status_desc: string;
  username: number;
  firstname: string;
  lastname: string;
  costcenter: string;
  ba: string;
  part: string;
  area: string;
  job_name: string;
  level: string;
  div_name: string;
  dep_name: string;
  org_name: string;
  email: string;
  position: string;
  role?: string;
}
