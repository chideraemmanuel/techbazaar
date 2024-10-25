'use client';

import { RiArrowLeftLine } from '@remixicon/react';
import { useRouter } from 'next/navigation';
import { FC } from 'react';

interface Props {}

const AuthPageBackButton: FC<Props> = () => {
  const router = useRouter();

  return (
    <>
      <button
        onClick={() => router.back()}
        className="p-4 rounded-full bg-secondary text-secondary-foreground mb-9 md:mb-6"
      >
        <RiArrowLeftLine />
      </button>
    </>
  );
};

export default AuthPageBackButton;
