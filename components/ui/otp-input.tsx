'use client';

import {
  ChangeEvent,
  ClipboardEvent,
  FC,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Input } from './input';

interface Props {
  length?: number;
  onOTPChange?: (otp: string) => void;
}

const OTPInput: FC<Props> = ({ length = 6, onOTPChange }) => {
  const [OTP, setOTP] = useState<string[]>(new Array(length).fill(''));

  const inputRefs = useRef<HTMLInputElement[]>([]);

  useEffect(() => {
    inputRefs.current[0].focus();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;

    if (!/^\d*$/.test(value)) {
      e.target.value = '';
      return;
    }

    const newOTP = [...OTP];
    newOTP[index] = value;

    setOTP(newOTP);

    if (value && index < length - 1) {
      inputRefs.current[index + 1].focus();
    }

    if (onOTPChange) {
      onOTPChange(newOTP.join(''));
    }
  };

  const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && index > 0) {
      inputRefs.current[index - 1].focus();
    }

    if (e.key === 'ArrowRight' && index < length - 1) {
      inputRefs.current[index + 1].focus();
    }

    if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').slice(0, length);
    const newOTP = [...OTP];

    pasteData.split('').forEach((char, index) => {
      if (/^\d$/.test(char)) {
        newOTP[index] = char;
        inputRefs.current[index].value = char;
      }
    });

    setOTP(newOTP);
    inputRefs.current[Math.min(pasteData.length, length - 1)].focus();

    if (onOTPChange) {
      onOTPChange(newOTP.join(''));
    }
  };

  return (
    <>
      <div className="w-full">
        <div className="flex items-center gap-2 sm:gap-3">
          {OTP.map((value, index) => (
            <Input
              key={index}
              type="text"
              placeholder="0"
              pattern="\d*"
              inputMode="numeric"
              maxLength={1}
              value={value}
              // @ts-ignore
              ref={(inputElement) =>
                inputRefs.current.push(inputElement as HTMLInputElement)
              }
              onChange={(e) => handleChange(e, index)}
              onKeyUp={(e) => handleKeyUp(e, index)}
              onPaste={handlePaste}
              className="h-[64px] sm:h-20 p-2 placeholder:text-muted-foreground/60 text-[36px] sm:text-[48px] tracking-[-2%] rounded-[8px] text-center"
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default OTPInput;
