import type { UserSession } from '@repo/shared/types';

export type UserSessionJWT = UserSession & {
  iat: number;
  exp: number;
};
