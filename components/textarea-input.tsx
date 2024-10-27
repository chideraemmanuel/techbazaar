'use client';

import React, { ComponentPropsWithoutRef, ElementRef } from 'react';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/cn';
import { Textarea } from './ui/textarea';

interface TextareaInputProps extends ComponentPropsWithoutRef<typeof Textarea> {
  label?: string;
  labelProps?: ComponentPropsWithoutRef<typeof Label>;
  error?: string;
}

type TextareaInputRef = ElementRef<typeof Textarea>;

const TextareaInput = React.forwardRef<TextareaInputRef, TextareaInputProps>(
  ({ label, labelProps, error, id, className, ...props }, ref) => {
    return (
      <>
        <div className="w-full">
          <Label
            {...labelProps}
            htmlFor={id}
            className={cn(
              'text-foreground/80 font-medium text-sm',
              labelProps?.className
            )}
          >
            {label}
          </Label>
          <Textarea
            id={id}
            className={cn(
              'resize-none bg-background shadow-sm text-foreground/80 text-base mt-1',
              error && 'border-destructive',
              className
            )}
            ref={ref}
            {...props}
          />

          <span className="text-xs text-destructive">{error}</span>
        </div>
      </>
    );
  }
);

export default TextareaInput;
