'use client';

import { Mode } from '@/types';
import { useTheme } from 'next-themes';
import { Toaster } from 'sonner';

import { useMounted } from '@/hooks/use-mounted';

export default function ToastContainer() {
  const { theme: mode, forcedTheme } = useTheme();
  const mounted = useMounted();

  return (
    mounted && (
      <Toaster
        richColors
        position='top-right'
        closeButton
        theme={(forcedTheme || mode || 'dark') as Mode}
      />
    )
  );
}
