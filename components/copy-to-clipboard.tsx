'use client';

import React, { ComponentPropsWithoutRef, ElementRef, FC } from 'react';

type CopyToClipboardProps = ComponentPropsWithoutRef<'button'> & {
  text: string;
};

type CopyToClipboardRef = ElementRef<'button'>;

const CopyToClipboard = React.forwardRef<
  CopyToClipboardRef,
  CopyToClipboardProps
>(({ text, onClick, ...props }, ref) => {
  return (
    <>
      <button
        onClick={(e) => {
          navigator.clipboard.writeText(text);
          onClick?.(e);
        }}
        {...props}
      />
    </>
  );
});

export default CopyToClipboard;
