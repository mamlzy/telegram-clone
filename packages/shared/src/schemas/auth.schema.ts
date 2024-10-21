import { z } from 'zod';

export const registerSchema = z
  .object({
    name: z.string().trim().nonempty(),
    email: z.string().trim().email(),
    password: z.string().trim().min(6),
    passwordConfirmation: z.string().trim().min(6),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords don't match",
    path: ['password', 'passwordConfirmation'],
  });
export type RegisterSchema = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().trim().min(6),
});
export type LoginSchema = z.infer<typeof loginSchema>;
