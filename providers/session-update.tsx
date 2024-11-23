'use client';

import { getCookie, ONE_DAY, setCookie } from '@/lib/cookie';
import { usePathname } from 'next/navigation';
import React, { FC } from 'react';

interface Props {}

const SessionUpdate: FC<Props> = () => {
  const pathname = usePathname();

  React.useEffect(() => {
    const cookie = getCookie('session_id');

    if (cookie) {
      setCookie('session_id', cookie, ONE_DAY);
    }
  }, [pathname]);

  return null;
};

export default SessionUpdate;
