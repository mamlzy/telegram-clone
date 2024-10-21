import type { Prisma } from '@repo/db';

export type UserWithoutPassword = Prisma.UserGetPayload<{
  omit: { password: true };
}>;
