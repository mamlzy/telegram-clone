import { db } from '@repo/db';
import {
  accessChatSchema,
  getAllConversationByUserIdQuerySchema,
} from '@repo/shared/schemas';
import type { Request, Response } from 'express';
import { z } from 'zod';

//! access chat
export const accessChat = async (req: Request, res: Response) => {
  const { body } = z
    .object({
      body: accessChatSchema,
    })
    .parse(req);

  const { user1Id, user2Id } = body;

  //! check is user1 and user2 are in the same conversation
  const isConversationExists = await db.conversation.findFirst({
    where: {
      AND: [
        {
          conversationMembers: {
            some: {
              userId: user1Id,
            },
          },
        },
        {
          conversationMembers: {
            some: {
              userId: user2Id,
            },
          },
        },
      ],
    },
    include: {
      conversationMembers: true,
    },
  });

  if (!isConversationExists) {
    await db.$transaction(async (tx) => {
      //! create conversation and the members
      await tx.conversation.create({
        data: {
          name: null,
          conversationMembers: {
            createMany: {
              data: [
                { userId: user1Id, joinDate: new Date() },
                { userId: user2Id, joinDate: new Date() },
              ],
            },
          },
        },
      });
    });

    return res.status(200).json('New conversation created');
  }

  return res.status(200).json('Using existing conversation');
};

//! get all by
export const getAllByUserId = async (req: Request, res: Response) => {
  const { params } = z
    .object({
      params: z.object({
        userId: z.string().nonempty(),
      }),
      query: getAllConversationByUserIdQuerySchema,
    })
    .parse(req);

  const { userId } = params;
  // const { page = DEFAULT_PAGE, limit = DEFAULT_LIMIT } = query;

  const conversations = await db.conversation.findMany({
    where: {
      conversationMembers: {
        some: {
          userId,
        },
      },
    },
    include: {
      conversationMembers: { include: { user: true } },
    },
  });

  res.status(200).json({
    data: conversations,
  });
};
