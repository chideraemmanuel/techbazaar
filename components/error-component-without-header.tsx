'use client';

import { cn } from '@/lib/cn';
import { FC } from 'react';
import { Button, buttonVariants } from './ui/button';
import Link from 'next/link';

interface Props {}

const ErrorComponentWithoutHeader: FC<Props> = () => {
  return (
    <>
      <div
        className={cn(
          'fixed h-[100vh] w-[100vw] top-0 left-0 flex flex-col items-center justify-center'
        )}
      >
        <p className="text-center text-base md:text-lg w-[90%] mb-1 tracking-wide">
          Oops! An error occured.
        </p>

        <p className="text-center text-sm md:text-base w-[90%] tracking-wide">
          You can{' '}
          <Button
            onClick={() => location.reload()}
            variant={'link'}
            className="p-0 h-auto text-sm md:text-base"
          >
            refresh
          </Button>{' '}
          the page or try again later. If the error persists, you can{' '}
          <Link
            href={`mailto:thechideraemmanuel@gmail.com`}
            className={cn(
              buttonVariants({ variant: 'link' }),
              'p-0 h-auto text-sm md:text-base'
            )}
          >
            contact support
          </Link>
          .
        </p>
      </div>
    </>
  );
};

export default ErrorComponentWithoutHeader;
