import type { UserSessionJWT } from './index.ts';

declare global {
  namespace Express {
    export interface Request {
      user?: UserSessionJWT;
    }
  }
}

export {};
