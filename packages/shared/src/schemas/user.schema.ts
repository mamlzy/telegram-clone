import { z } from 'zod';

export const getAllUserQuerySchema = z.object({
  page: z.coerce.number().positive().optional(),
  limit: z.coerce.number().positive().optional(),
  name: z.string().optional(),
  email: z.string().optional(),
});
export type GetAllUserQuerySchema = z.infer<typeof getAllUserQuerySchema>;
