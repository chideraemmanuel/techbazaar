'use client';

import React, { ComponentPropsWithoutRef, ElementRef, FC } from 'react';
import { toast } from 'sonner';

type CopyToClipboardProps = ComponentPropsWithoutRef<'button'> & {
  text: string;
  toast?: boolean;
  toastText?: string;
};

type CopyToClipboardRef = ElementRef<'button'>;

const CopyToClipboard = React.forwardRef<
  CopyToClipboardRef,
  CopyToClipboardProps
>(({ text, onClick, toast: toastAfterCopy, toastText, ...props }, ref) => {
  return (
    <>
      <button
        onClick={(e) => {
          navigator.clipboard.writeText(text);
          if (toastAfterCopy) {
            toast.success(toastText || 'Copied');
          }
          onClick?.(e);
        }}
        {...props}
      />
    </>
  );
});

export default CopyToClipboard;
