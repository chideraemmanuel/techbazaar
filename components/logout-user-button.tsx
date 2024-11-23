'use client';

import useLogoutUser from '@/lib/hooks/auth/use-logout-user';
import { Slot } from '@radix-ui/react-slot';
import React, { ComponentPropsWithoutRef, ElementRef, FC } from 'react';
import FullScreenSpinner from './full-screen-spinner';
import useAxiosPrivate from '@/lib/hooks/use-axios-private';

type LogoutUserButtonProps = ComponentPropsWithoutRef<'button'> & {
  asChild?: boolean;
};

type LogoutUserButtonRef = ElementRef<'button'>;

const LogoutUserButton = React.forwardRef<
  LogoutUserButtonRef,
  LogoutUserButtonProps
>(({ asChild, onClick, ...props }, ref) => {
  const Comp = asChild ? Slot : 'button';

  const axios = useAxiosPrivate();

  const { mutate: logoutUser, isLoading } = useLogoutUser();
  return (
    <>
      {isLoading && <FullScreenSpinner />}

      <Comp
        onClick={(e) => {
          logoutUser(axios);
          onClick?.(e);
        }}
        ref={ref}
        {...props}
      />
    </>
  );
});

export default LogoutUserButton;
