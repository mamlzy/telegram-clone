import { db, Manager } from '@repo/db';
import { TRPCError } from '@trpc/server';

import { Role } from './types.js';

export const userHasRequiredRole = async (
  id: string,
  requiredRole: Role
): Promise<boolean> => {
  let userExists: Manager | null = null;

  switch (requiredRole) {
    case 'admin':
      userExists = await db.admin.findUnique({
        where: {
          id,
        },
      });
      break;
    case 'manager':
      userExists = await db.manager.findUnique({
        where: {
          id,
        },
      });
      break;
  }

  return Boolean(userExists);
};

export const authorizeUser = async (
  id: string,
  roles: Role[]
): Promise<void> => {
  //! No spesific roles required, access is granted
  if (!roles || roles.length === 0) return;

  const roleCheckPermissions = roles.map((role) =>
    userHasRequiredRole(id, role)
  );

  const roleCheckResults = await Promise.all(roleCheckPermissions);

  console.log({ roleCheckResults });
  if (!roleCheckResults.some(Boolean)) {
    throw new TRPCError({
      code: 'FORBIDDEN',
      message: 'You do not have the required role to access this resource.',
    });
  }
};
