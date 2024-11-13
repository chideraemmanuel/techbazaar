'use client';

import React, { ComponentPropsWithoutRef, ElementRef, FC } from 'react';
import { Button } from '../../../components/ui/button';
import { FcGoogle } from 'react-icons/fc';
import { useQuery } from 'react-query';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import axios from '@/config/axios';

type GoogleSignInButtonProps = ComponentPropsWithoutRef<typeof Button> & {
  // username?: string;
  // success_redirect_path: string
  // error_redirect_path: string
};

type GoogleSignInButtonRef = ElementRef<typeof Button>;

const GoogleSignInButton = React.forwardRef<
  GoogleSignInButtonRef,
  GoogleSignInButtonProps
>(({ disabled, onClick, ...props }, ref) => {
  const router = useRouter();
  const pathname = usePathname();

  // const return_to = useSearchParams().get('return_to') || '/';

  const { data, isLoading } = useQuery({
    queryKey: ['get google oauth url'],
    queryFn: async () => {
      const queryStrings = new URLSearchParams();

      queryStrings.set('success_redirect_path', '/');
      queryStrings.set('error_redirect_path', pathname);

      const response = await axios.get<{ uri: string }>(
        `/auth/google/url?${queryStrings.toString()}`
      );

      return response.data;
    },
  });

  console.log('uri', data?.uri);

  return (
    <>
      <Button
        type="button"
        variant={'outline'}
        ref={ref}
        // className="w-full"
        {...props}
        disabled={disabled || isLoading}
        onClick={(e) => {
          if (data) {
            router.push(data.uri);
          }
          onClick && onClick(e);
        }}
      >
        <FcGoogle className="mr-2 h-4 w-4" />
        Continue with Google
      </Button>
    </>
  );
});

export default GoogleSignInButton;
