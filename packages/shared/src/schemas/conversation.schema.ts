import { z } from 'zod';

export const accessChatSchema = z.object({
  user1Id: z.string().nonempty(),
  user2Id: z.string().nonempty(),
});
export type AccessChatSchema = z.infer<typeof accessChatSchema>;

export const getAllConversationByUserIdQuerySchema = z.object({
  page: z.coerce.number().positive().optional(),
  limit: z.coerce.number().positive().optional(),
});
