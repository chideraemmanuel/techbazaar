'use client';

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
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Button } from './ui/button';
import { Check, ChevronDown } from 'lucide-react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from './ui/command';
import { ScrollArea } from './ui/scroll-area';
import { CURRENCIES } from '@/constants';
import useExchangeRates from '@/lib/hooks/use-exchange-rates';
import useIPInformation from '@/lib/hooks/use-ip-information';
import convertPrice, { DEFAULT_RATES } from '@/lib/convert-price';

interface MoneyInputProps
  extends Omit<
    ComponentPropsWithoutRef<typeof Input>,
    'value' | 'defaultValue'
  > {
  label?: string;
  labelProps?: ComponentPropsWithoutRef<typeof Label>;
  defaultCurrency?: string;
  defaultValue?: number;
  error?: string;
  onFieldChange?: (original: number, converted: number) => void;
  disableCurrencySelect?: boolean;
}

type MoneyInputRef = ElementRef<typeof Input>;

const MoneyInput = React.forwardRef<MoneyInputRef, MoneyInputProps>(
  (
    {
      label,
      labelProps,
      defaultCurrency = 'NGN',
      error,
      placeholder,
      defaultValue,
      onChange,
      onPaste,
      onFieldChange,
      disableCurrencySelect,
      className,
      id,
      ...props
    },
    ref
  ) => {
    const defaultCurrencyValue = CURRENCIES.find(
      (currency) => currency.code === defaultCurrency
    );

    const [currencyValue, setCurrencyValue] = React.useState<null | ICurrency>(
      defaultCurrencyValue || null
    );

    const formatted_default_value = new Intl.NumberFormat(
      navigator.language || 'en-US',
      {
        style: 'decimal',
      }
    ).format(defaultValue || 0);

    const [inputValue, setInputValue] = React.useState(
      formatted_default_value === '0' ? '' : formatted_default_value
    );

    const {
      data: rates,
      isLoading: isFetchingExchangeRates,
      isError: errorFetchingExchangeRates,
    } = useExchangeRates();

    const {
      data: IP_information,
      isLoading: isFetchingIPInformation,
      isError: errorFetchingIPInformation,
    } = useIPInformation();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      let value = e.target.value.replace(/[^0-9.]/g, ''); // Remove non-numeric characters

      const formatted_value = new Intl.NumberFormat(
        navigator.language || 'en-US',
        {
          style: 'decimal',
        }
      ).format(+value);

      // e.target.value = value;

      setInputValue(formatted_value === '0' ? '' : formatted_value);

      const converted = convertPrice(
        +value,
        currencyValue?.code as keyof typeof DEFAULT_RATES.rates,
        'NGN',
        rates
      );

      console.log({
        formatted_value: formatted_value === '0' ? '' : formatted_value,
        value: +value,
        converted,
      });

      onFieldChange?.(+value, converted);
      onChange?.(e);
    };

    // TODO: fix this; doesn't format properly if parts are highlighted before paste
    const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();

      // let pasteValue = e.clipboardData.getData('text').replace(/[^0-9.]/g, '');
      // if (!pasteValue) return;

      // const input = e.currentTarget;
      // const { selectionStart, selectionEnd } = input;

      // let newValue;
      // if (
      //   selectionStart !== null &&
      //   selectionEnd !== null &&
      //   selectionStart !== selectionEnd
      // ) {
      //   newValue =
      //     input.value.substring(0, selectionStart) +
      //     pasteValue +
      //     input.value.substring(selectionEnd);
      // } else {
      //   const caretPos = selectionStart ?? input.value.length;
      //   newValue =
      //     input.value.substring(0, caretPos) +
      //     pasteValue +
      //     input.value.substring(caretPos);
      // }

      // const formatted_value = newValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

      // setInputValue(formatted_value);

      // const selectedCurrencyRate = currencyValue
      //   ? DEFAULT_RATES.rates[
      //       currencyValue.code as keyof typeof DEFAULT_RATES.rates
      //     ]
      //   : DEFAULT_RATES.rates['NGN'];

      // const converted = +newValue * selectedCurrencyRate;

      // console.log({ formatted_value, value: +newValue, converted });

      // onFieldChange?.(+newValue, converted);
      // onPaste?.(e);
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

          <div
            className={cn(
              'flex mt-1 rounded-md ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2'
            )}
          >
            <CurrencySelect
              currencyValue={currencyValue}
              setCurrencyValue={setCurrencyValue}
              disabled={disableCurrencySelect}
              setInputValue={setInputValue}
              onFieldChange={onFieldChange}
            />

            <Input
              {...props}
              id={id}
              ref={ref}
              placeholder={placeholder || 'Enter amount'}
              value={inputValue}
              // pattern="\d*"
              inputMode="numeric"
              className={cn(
                error && 'border-destructive',
                'bg-background shadow-sm text-foreground rounded-e-lg rounded-s-none focus-visible:ring-0 text-base',
                className
              )}
              onChange={handleChange}
              onPaste={handlePaste}
            />
          </div>

          <span className="text-xs text-destructive">{error}</span>
        </div>
      </>
    );
  }
);

export default MoneyInput;

interface ICurrency {
  code: string;
  name: string;
  symbol: string;
}

const CurrencySelect: FC<{
  currencyValue: ICurrency | null;
  setCurrencyValue: React.Dispatch<React.SetStateAction<ICurrency | null>>;
  disabled?: boolean;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  onFieldChange?: (original: number, converted: number) => void;
}> = ({
  currencyValue,
  setCurrencyValue,
  disabled,
  setInputValue,
  onFieldChange,
}) => {
  const [comboboxOpen, setComboboxOpen] = React.useState(false);
  return (
    <>
      <Popover open={comboboxOpen} onOpenChange={setComboboxOpen}>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant={'outline'}
            className={cn(
              'flex gap-1 rounded-e-none rounded-s-lg px-3 bg-secondary'
            )}
            disabled={disabled}
          >
            <span className="text-secondary-foreground/80 font-bold text-base">
              {currencyValue?.symbol}
            </span>
            <ChevronDown
              className={cn(
                '-mr-2 h-4 w-4 opacity-50',
                disabled ? 'hidden' : 'opacity-100'
              )}
            />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-[300px] p-0">
          <Command>
            <CommandList>
              <ScrollArea className="h-72">
                <CommandInput placeholder="Search currency..." />
                <CommandEmpty>No currency found.</CommandEmpty>
                <CommandGroup>
                  {CURRENCIES.sort((a, b) => {
                    if (a.name < b.name) {
                      return -1;
                    }
                    if (a.name > b.name) {
                      return 1;
                    }
                    return 0;
                  }).map((currency) => (
                    <CommandItem
                      key={currency.code}
                      className="gap-2"
                      value={currency.name}
                      onSelect={(value) => {
                        onFieldChange?.(0, 0);
                        setInputValue('');

                        setComboboxOpen(false);
                        setCurrencyValue(currency);
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <span>{currency.symbol}</span>
                        <span>{currency.name}</span>
                      </div>

                      <Check
                        className={cn(
                          'ml-auto h-4 w-4',
                          currency.code === currencyValue?.code
                            ? 'opacity-100'
                            : 'opacity-0'
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </ScrollArea>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </>
  );
};
