'use client';

import * as React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { DayFlag, DayPicker, SelectionState, UI } from 'react-day-picker';

import { cn } from '@/lib/cn';
import { Button, buttonVariants } from '@/components/ui/button';

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('p-3 relative', className)}
      classNames={{
        // months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
        month: 'space-y-4',
        [UI.MonthCaption]: 'flex justify-center pt-1 relative items-center',
        caption_label: 'text-sm font-medium',
        nav: 'space-x-1 flex items-center',
        [UI.NextMonthButton]: cn(
          // buttonVariants({ variant: 'outline' }),
          'absolute right-3 top-3 z-[2]'
        ),
        [UI.PreviousMonthButton]: cn(
          // buttonVariants({ variant: 'outline' }),
          'absolute left-3 top-3 z-[2]'
        ),
        [UI.MonthGrid]: 'w-full border-collapse space-y-1',
        [UI.Weekdays]: 'flex',
        [UI.Weekday]:
          'text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]',
        [UI.Week]: 'flex w-full mt-2',
        [UI.Day]: cn(
          buttonVariants({ variant: 'ghost' }),
          'cursor-pointer font-normal aria-selected:opacity-100 h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20'
        ),
        [SelectionState.range_end]: 'day-range-end',
        [SelectionState.selected]:
          'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
        [DayFlag.today]: 'bg-accent text-accent-foreground',
        [DayFlag.outside]:
          'day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30',
        [DayFlag.disabled]: 'text-muted-foreground opacity-50',
        [SelectionState.range_middle]:
          'aria-selected:bg-accent aria-selected:text-accent-foreground',
        [DayFlag.hidden]: 'invisible',
        ...classNames,
      }}
      components={{
        NextMonthButton: ({ className, ...props }) => (
          <Button
            variant={'outline'}
            className={cn(
              'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100',
              className
            )}
            {...props}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        ),
        PreviousMonthButton: ({ className, ...props }) => (
          <Button
            variant={'outline'}
            className={cn(
              'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100',
              className
            )}
            {...props}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        ),
      }}
      {...props}
    />
  );
}
Calendar.displayName = 'Calendar';

export { Calendar };
