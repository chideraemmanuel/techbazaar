import { cn } from '@/lib/cn';
import { FC } from 'react';
import { Button, buttonVariants } from './ui/button';
import Link from 'next/link';

interface Props {}

const NotFoundComponentWithoutHeader: FC<Props> = () => {
  return (
    <>
      <div
        className={cn(
          'fixed h-[100vh] w-[100vw] top-0 left-0 flex flex-col gap-5 items-center justify-center'
        )}
      >
        <h1 className="text-center text-3xl md:text-4xl md:w-[90%] tracking-wide">
          Page Not Found
        </h1>

        <p className="text-center text-muted-foreground text-sm sm:text-base md:text-lg w-[90%]">
          Oops! The page you’re looking for can’t be found. It may have been
          moved, deleted, or never existed in the first place. Please
          double-check the URL or head back to the homepage.
        </p>

        <Link href={'/'} className={buttonVariants()}>
          Go to homepage
        </Link>
      </div>
    </>
  );
};

export default NotFoundComponentWithoutHeader;
