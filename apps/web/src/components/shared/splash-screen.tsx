import React from 'react';
import { LoaderCircleIcon } from 'lucide-react';

export const SplashScreen = () => {
  return (
    <div className='grid min-h-svh place-items-center bg-background'>
      <LoaderCircleIcon className='size-14 animate-spin text-primary' />
    </div>
  );
};
