import type { User } from 'better-auth';

declare global {
  namespace Express {
    export interface Request {
      user?: User;
    }
  }
}

export {};
