'use client';

import {
  ComponentPropsWithoutRef,
  ElementRef,
  FC,
  forwardRef,
  useState,
} from 'react';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { UploadIcon } from 'lucide-react';
import Image from 'next/image';
import phone from '@/assets/phone.png';
import { cn } from '@/lib/cn';

interface ImageInputProps extends ComponentPropsWithoutRef<typeof Input> {
  label?: string;
  error?: string;
  defaultImage?: string;
}

type ImageInputRef = ElementRef<typeof Input>;

const ImageInput = forwardRef<ImageInputRef, ImageInputProps>(
  (
    {
      placeholder,
      label,
      defaultImage,
      error,
      className,
      disabled,
      onChange,
      ...props
    },
    ref
  ) => {
    const [selectedImage, setSelectedImage] = useState<
      undefined | { name: string; src: string | ArrayBuffer | null }
    >(undefined);

    return (
      <>
        <div className="w-full">
          <Label className="w-full">
            <span className={`${disabled && 'pointer-events-none'}`}>
              {label}
            </span>

            <Input
              type="file"
              accept="image/png,image/jpg,image/jpeg"
              className="hidden"
              ref={ref}
              disabled={disabled}
              onChange={(e) => {
                console.log('selected image File:', e.target.files);

                if (e.target.files?.[0]) {
                  const reader = new FileReader();
                  reader.readAsDataURL(e.target.files?.[0]);
                  reader.onload = () => {
                    setSelectedImage({
                      name: e.target.files?.[0].name!,
                      src: reader.result,
                    });
                  };
                }

                if (onChange) {
                  onChange(e);
                }
              }}
              {...props}
            />

            <Card
              className={cn(
                'w-full h-28 cursor-pointer relative flex justify-center items-center p-5 border-dashed overflow-hidden mt-1',
                error && 'border-destructive',
                disabled && 'cursor-not-allowed',
                className
              )}
            >
              {(selectedImage?.src ?? defaultImage) && (
                <Image
                  // @ts-ignore
                  src={selectedImage?.src || defaultImage}
                  alt={label || ''}
                  width={1000}
                  height={1000}
                  className="max-h-full w-auto"
                />
              )}

              <div className="flex flex-col justify-center items-center gap-2 absolute top-0 left-0 w-full h-full bg-accent/40">
                <UploadIcon className="w-5 h-5" />

                <span className="text-xs text-center mx-auto truncate w-[90%]">
                  {selectedImage?.src
                    ? selectedImage.name
                    : defaultImage
                    ? // ? ''
                      defaultImage
                    : placeholder || 'No Image Selected'}
                </span>
              </div>
            </Card>
          </Label>

          <span className="text-xs text-destructive">{error}</span>
        </div>
      </>
    );
  }
);

export default ImageInput;