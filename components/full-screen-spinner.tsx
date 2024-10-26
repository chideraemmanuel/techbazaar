'use client';

import { Loader2 } from 'lucide-react';
import React, { FC } from 'react';

interface Props {}

const FullScreenSpinner: FC<Props> = () => {
  React.useEffect(() => {
    // Disable scrolling and pointer events
    document.body.style.overflow = 'hidden';
    document.body.style.pointerEvents = 'none';

    // Disable all keyboard events
    const handleKeyDown = (event: KeyboardEvent) => {
      event.preventDefault();
    };
    window.addEventListener('keydown', handleKeyDown);

    // Cleanup function to restore events when loading is done
    return () => {
      document.body.style.overflow = '';
      document.body.style.pointerEvents = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <>
      <div className="fixed inset-0 w-screen h-screen z-[100] bg-[#D9D9D9] bg-opacity-70 backdrop-blur-sm flex items-center justify-center">
        <Loader2 className="text-primary w-14 h-14 animate-spin" />
      </div>
    </>
  );
};

export default FullScreenSpinner;
