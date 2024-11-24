'use client';

import { ONE_DAY, setCookie } from '@/lib/cookie';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { FC } from 'react';
import { toast } from 'sonner';

interface Props {}

const GoogleSignInToast: FC<Props> = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const new_account = searchParams.get('new_account');
  const session_id = searchParams.get('session_id');

  React.useEffect(() => {
    if (new_account === 'true' && session_id) {
      toast.success('Account created successfully');

      setCookie('session_id', session_id, ONE_DAY);

      router.replace(pathname);
      router.refresh();
    }

    if (new_account === 'false' && session_id) {
      toast.success('Login successful');

      setCookie('session_id', session_id, ONE_DAY);

      router.replace(pathname);
      router.refresh();
    }
  }, [new_account, session_id, pathname]);

  return null;
};

export default GoogleSignInToast;
