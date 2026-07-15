import { z } from 'zod';

export const registerSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(6),
    firstName: z.string().min(2),
    lastName: z.string().min(2),
    role: z.enum(['STUDENT', 'FACULTY']).optional(),
    // Additional fields based on role are validated inside the service
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(6),
  }),
});
