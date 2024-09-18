'use client';

import { useTheme } from 'next-themes';
import { Toaster, type ToasterProps } from 'sonner';

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
        theme={(forcedTheme || mode || 'dark') as ToasterProps['theme']}
      />
    )
  );
}
