import React, {
  ChangeEvent,
  ClipboardEvent,
  ComponentPropsWithoutRef,
  ElementRef,
  FC,
} from 'react';
import { Input } from './ui/input';
import { cn } from '@/lib/cn';
import { Label } from './ui/label';

interface MoneyInputProps extends ComponentPropsWithoutRef<typeof Input> {
  label?: string;
  labelProps?: ComponentPropsWithoutRef<typeof Label>;
  currencySymbol?: string;
}

type MoneyInputRef = ElementRef<typeof Input>;

const MoneyInput = React.forwardRef<MoneyInputRef, MoneyInputProps>(
  (
    {
      label,
      labelProps,
      placeholder,
      onChange,
      currencySymbol,
      className,
      id,
      ...props
    },
    ref
  ) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      let value = '';

      e.target.value.split('').forEach((char) => {
        if (!/^\d*$/.test(char) && char !== '.') {
          return;
        } else {
          value += char;
        }
      });

      e.target.value = value;

      onChange?.(e);
    };

    const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();
    };

    return (
      <>
        <div>
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
          <div className="relative mt-1">
            <div className="absolute left-0 top-0 bottom-0 w-[58px] flex items-center justify-center border bg-secondary rounded-tl-sm rounded-bl-sm text-secondary-foreground/80 font-bold text-base">
              {currencySymbol || '₦'}
            </div>

            <Input
              id={id}
              ref={ref}
              placeholder={placeholder || 'Enter amount'}
              // pattern="\d*"
              inputMode="numeric"
              className={cn(
                //   `${error && 'border-destructive'}`,
                'bg-background shadow-sm text-foreground pl-[calc(58px_+_8px)] text-base',
                className
              )}
              onChange={handleChange}
              onPaste={handlePaste}
              {...props}
            />
          </div>
        </div>
      </>
    );
  }
);

export default MoneyInput;
