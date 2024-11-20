'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { FC } from 'react';
import { toast } from 'sonner';

interface Props {}

const GoogleSignInToast: FC<Props> = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const new_account = searchParams.get('new_account');

  React.useEffect(() => {
    if (new_account === 'true') {
      toast.success('Account created successfully');
      router.replace(pathname);
    }

    if (new_account === 'false') {
      toast.success('Login successful');
      router.replace(pathname);
    }
  }, [new_account]);

  return null;
};

export default GoogleSignInToast;
