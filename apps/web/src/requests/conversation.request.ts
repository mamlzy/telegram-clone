import type { Prisma } from '@repo/db';
import type { AccessChatSchema } from '@repo/shared/schemas';
import type { Res } from '@repo/shared/types';

import { api } from '@/lib/axios';

const acessChat = async (payload: AccessChatSchema) => {
  const { data } = await api.post('/conversations/access-chat', payload);

  return data;
};

const getAllByUserId = async (userId: string) => {
  const { data } = await api.get<
    Res<
      Prisma.ConversationGetPayload<{
        include: { conversationMembers: { include: { user: true } } };
      }>[]
    >
  >(`/conversations/${userId}/all`);

  return data;
};

export const conversationRequest = {
  acessChat,
  getAllByUserId,
};
