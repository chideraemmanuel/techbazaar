'use client';

import React, { ComponentPropsWithoutRef, ElementRef, FC } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Label } from './ui/label';
import { cn } from '@/lib/cn';
import { format } from 'date-fns';
import { buttonVariants } from './ui/button';
import { RiCalendar2Line } from '@remixicon/react';
import { Calendar } from './ui/calendar';
import { CalendarIcon } from 'lucide-react';

interface DateInputProps {
  label?: string;
  labelProps?: ComponentPropsWithoutRef<typeof Label>;
  placeholder?: string;
  icon?: React.ReactNode;
  defaultValue?: Date;
  dateInputTriggerProps?: ComponentPropsWithoutRef<typeof PopoverTrigger>;
  onSelect?: (selectedDate: Date | undefined) => void;
}

type DateInputRef = ElementRef<typeof PopoverTrigger>;

const DateInput = React.forwardRef<DateInputRef, DateInputProps>(
  (
    {
      label,
      labelProps,
      placeholder,
      icon,
      defaultValue,
      dateInputTriggerProps,
      onSelect,
      ...props
    },
    ref
  ) => {
    const [date, setDate] = React.useState<Date | undefined>(defaultValue);

    return (
      <>
        <Popover>
          <div>
            <Label
              {...labelProps}
              htmlFor={dateInputTriggerProps?.id}
              className={cn(
                'text-foreground/80 font-medium text-sm',
                labelProps?.className
              )}
            >
              {label}
            </Label>
            <PopoverTrigger
              title={date && format(date, 'PPP')}
              ref={ref}
              {...dateInputTriggerProps}
              className={cn(
                buttonVariants({ variant: 'outline' }),
                'mt-1 flex justify-between items-center gap-2',
                !date && 'text-muted-foreground',
                dateInputTriggerProps?.className
              )}
            >
              {date ? (
                <span className="inline-block text-sm truncate">
                  {format(date, 'PPP')}
                </span>
              ) : (
                <span className="inline-block text-sm">
                  {placeholder || 'Pick a date'}
                </span>
              )}

              <span>
                {icon || <CalendarIcon className="h-5 w-5 text-foreground" />}
              </span>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(selectedDate) => {
                  console.log('selected date', selectedDate);

                  setDate(selectedDate);

                  if (onSelect) {
                    onSelect(selectedDate);
                  }
                }}
              />
            </PopoverContent>
          </div>
        </Popover>
      </>
    );
  }
);

export default DateInput;
