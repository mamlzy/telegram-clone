'use client';

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type Dispatch,
  type SetStateAction,
} from 'react';
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { usePathname, useRouter } from 'next/navigation';
import { authRequest } from '@/requests/auth.request';
import type { UserSession } from '@repo/shared/types';

import { SplashScreen } from '@/components/shared/splash-screen';

type SessionStatus = 'loading' | 'unauthenticated' | 'authenticated';

type UserContext = {
  session?: { user: UserSession | null };
  setUser: Dispatch<SetStateAction<UserSession | null>>;
  status: SessionStatus;
  setStatus: Dispatch<SetStateAction<SessionStatus>>;
};

const UserContextImpl = createContext<UserContext>(null!);

export function useSession() {
  return useContext(UserContextImpl);
}

export const SessionProvider = ({
  children,
  initialUser = null,
}: {
  children: React.ReactNode;
  initialUser?: UserSession | null;
}) => {
  const router = useRouter();
  const pathname = usePathname();

  const [user, setUser] = useState<UserSession | null>(initialUser);
  const [status, setStatus] = useState<SessionStatus>('loading');

  const userState = useMemo<UserContext>(
    () => ({ session: { user }, setUser, status, setStatus }),
    [user, setUser, status, setStatus]
  );

  //! watch session on every render
  useEffect(() => {
    if (!user) getAndSetSession({ router, setUser });
  });

  const isAuthRoutes = ['/login', '/register'].includes(pathname);

  return (
    <UserContextImpl.Provider value={userState}>
      {user || isAuthRoutes ? children : <SplashScreen />}
    </UserContextImpl.Provider>
  );
};

export const getAndSetSession = async ({
  router,
  setUser,
}: {
  router: AppRouterInstance;
  setUser: Dispatch<SetStateAction<UserSession | null>>;
}) => {
  try {
    const user = await authRequest.me();
    setUser(user);
  } catch (err) {
    router.replace('/login');
  }
};
