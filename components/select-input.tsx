'use client';

import React, {
  ComponentPropsWithoutRef,
  ElementRef,
  FC,
  useState,
} from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Label } from './ui/label';
import { cn } from '@/lib/cn';

interface SelectInputItem {
  id: string;
  name: string;
  value: string;
}

interface SelectInputProps {
  icon?: React.ReactNode;
  label?: string;
  error?: string;
  disabled?: boolean;
  placeholder?: string;
  //   defautlValue?: SelectInputItem;
  defautlValue?: string;
  selectInputItems: SelectInputItem[];
  selectInputTriggerProps?: Omit<
    ComponentPropsWithoutRef<typeof SelectTrigger>,
    'disabled'
  >;
  selectInputContentProps?: ComponentPropsWithoutRef<typeof SelectContent>;
  onItemSelect: (value: string) => void;
  //   onItemSelect: (selectedItem: SelectInputItem) => void;
  selectInputItemProps?: Omit<
    ComponentPropsWithoutRef<typeof SelectItem>,
    'onSelect' | 'value'
  >;
}

type SelectInputRef = ElementRef<typeof SelectTrigger>;

const SelectInput = React.forwardRef<SelectInputRef, SelectInputProps>(
  (
    {
      icon,
      label,
      error,
      disabled,
      placeholder,
      selectInputItems,
      defautlValue,
      selectInputTriggerProps,
      selectInputContentProps,
      onItemSelect,
      selectInputItemProps,
    },
    ref
  ) => {
    //  FOR MANAGING TRIGGER STYLES
    const [selectInputValue, setSelectInputValue] = useState<
      undefined | string
    >(defautlValue);

    return (
      <div>
        <Label htmlFor={selectInputTriggerProps?.id}>{label}</Label>
        <Select
          defaultValue={defautlValue}
          onValueChange={(value) => {
            console.log({ value });
            setSelectInputValue(value);
            onItemSelect(value);
          }}
        >
          <SelectTrigger
            {...selectInputTriggerProps}
            className={cn(
              '',
              !selectInputValue && 'text-muted-foreground',
              error && 'border-destructive',
              icon && 'space-x-1',
              selectInputTriggerProps?.className
            )}
            disabled={disabled}
            ref={ref}
          >
            {icon} <SelectValue placeholder={placeholder || 'Select'} />
          </SelectTrigger>

          <SelectContent {...selectInputContentProps}>
            {selectInputItems.map((item) => (
              <SelectItem
                key={item.id}
                value={item.id}
                {...selectInputItemProps}
              >
                {item.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <span className="text-xs text-destructive">{error}</span>
      </div>
    );
  }
);

export default SelectInput;
