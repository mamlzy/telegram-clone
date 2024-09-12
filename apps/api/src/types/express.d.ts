declare global {
  namespace Express {
    export interface Request {
      user?: {
        id: string;
        user_code: string;
        employee_code: string | null;
        name: string;
        role: { role_code: string; role_name: string };
        suppier: {} | null;
        iat: number;
        exp: number;
      };
    }
  }
}

export {};
