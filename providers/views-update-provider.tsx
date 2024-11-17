'use client';

import useUpdateViews from '@/lib/hooks/use-update-views';
import { getCookie, setCookie } from '@/lib/cookie';
import getIPAddress from '@/lib/get-ip-address';
import React, { FC } from 'react';
import { v4 as uuid } from 'uuid';

interface Props {
  children: React.ReactNode;
}

const ViewsUpdateProvider: FC<Props> = ({ children }) => {
  const cookieName = `techbazaar_visited`;
  const lastViewed = getCookie(cookieName);

  const currentTime = new Date().getTime();
  const ONE_DAY = 60 * 60 * 24 * 1000;

  const {
    mutate: updateViews,
    isLoading: isUpdatingViews,
    isSuccess: isSuccessUpdatingViews,
    isError: isErrorUpdatingViews,
    error: viewsUpdateError,
  } = useUpdateViews();

  React.useEffect(() => {
    const trackView = async () => {
      const referrer = document.referrer;
      let referrer_hostname = '';
      let referrer_full_url = '';

      if (referrer) {
        const url = new URL(referrer);
        referrer_full_url = url.href;
        referrer_hostname = url.hostname;
      }

      const ip_address = await getIPAddress();

      updateViews({
        visitor_id: uuid(),
        referrer: referrer_hostname,
        referrer_full_url,
        ip_address,
      });
    };

    if (!lastViewed || currentTime - +lastViewed > ONE_DAY) {
      trackView();
    }
  }, []);

  React.useEffect(() => {
    if (isSuccessUpdatingViews) {
      // Set cookie with the current timestamp
      setCookie(cookieName, currentTime, ONE_DAY);
    }
  }, [isSuccessUpdatingViews]);

  return <>{children}</>;
};

export default ViewsUpdateProvider;
