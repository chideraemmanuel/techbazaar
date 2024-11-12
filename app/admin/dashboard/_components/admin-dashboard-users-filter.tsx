'use client';

import React, { FC } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { RiFilter3Line } from '@remixicon/react';
import SelectInput from '@/components/select-input';
import FormInput from '@/components/form-input';
import { Switch } from '@/components/ui/switch';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useRouter, useSearchParams } from 'next/navigation';

interface Props {}

const AdminDashboardUsersFilter: FC<Props> = () => {
  const [popoverOpen, setPopoverOpen] = React.useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  const authTypeParam = searchParams.get('auth_type');
  const roleParam = searchParams.get('role');
  const emailVerifiedParam = searchParams.get('email_verified');
  const disabledParam = searchParams.get('disabled');

  const [authType, setAuthType] = React.useState(authTypeParam);
  const [role, setRole] = React.useState(roleParam);
  const [emailVerified, setEmailVerified] = React.useState(emailVerifiedParam);
  const [disabled, setDisabled] = React.useState(disabledParam);

  const applyFilter = () => {
    const newSearchParams = new URLSearchParams(searchParams.toString());

    newSearchParams.delete('auth_type');
    newSearchParams.delete('role');
    newSearchParams.delete('email_verified');
    newSearchParams.delete('disabled');

    if (authType) {
      newSearchParams.set('auth_type', authType);
    }

    if (role) {
      newSearchParams.set('role', role);
    }

    if (emailVerified) {
      newSearchParams.set('email_verified', emailVerified);
    }

    if (disabled) {
      newSearchParams.set('disabled', disabled);
    }

    router.replace(`?${newSearchParams}`, { scroll: false });

    setPopoverOpen(false);
  };

  const resetFilter = () => {
    setAuthType(null);
    setRole(null);
    setEmailVerified(null);
    setDisabled(null);

    const newSearchParams = new URLSearchParams(searchParams.toString());

    newSearchParams.delete('auth_type');
    newSearchParams.delete('role');
    newSearchParams.delete('email_verified');
    newSearchParams.delete('disabled');

    router.replace(`?${newSearchParams}`, { scroll: false });

    setPopoverOpen(false);
  };

  return (
    <>
      <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
        <PopoverTrigger asChild>
          <Button size={'sm'} variant={'outline'}>
            <RiFilter3Line />
            <span className="md:inline-block md:not-sr-only sr-only">
              Filter
            </span>
          </Button>
        </PopoverTrigger>

        <PopoverContent align="end" className="p-0">
          <div className="space-y-5 px-3 pt-5 pb-5">
            <FilterSection label="Authentication type">
              <SelectInput
                placeholder="Select authentication type"
                selectInputTriggerProps={{ className: '!p-2 h-[auto]' }}
                selectInputItemProps={{ className: 'capitalize' }}
                selectInputItems={[
                  {
                    name: 'google',
                    value: 'google',
                  },
                  {
                    name: 'manual',
                    value: 'manual',
                  },
                ]}
                defaultValue={authType || undefined}
                onItemSelect={(value) => setAuthType(value)}
              />
            </FilterSection>

            <FilterSection label="Role">
              <SelectInput
                placeholder="Select role"
                selectInputTriggerProps={{ className: '!p-2 h-[auto]' }}
                selectInputItemProps={{ className: 'capitalize' }}
                selectInputItems={[
                  {
                    name: 'admin',
                    value: 'admin',
                  },
                  {
                    name: 'user',
                    value: 'user',
                  },
                ]}
                defaultValue={role || undefined}
                onItemSelect={(value) => setRole(value)}
              />
            </FilterSection>

            <div className="flex items-center justify-between">
              <span className="inline-block pb-2 text-sm font-medium text-foreground/80">
                Email verified
              </span>

              <Switch
                checked={emailVerified === 'true'}
                onCheckedChange={(checkedValue) =>
                  setEmailVerified(`${checkedValue}`)
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <span className="inline-block pb-2 text-sm font-medium text-foreground/80">
                Disabled
              </span>

              <Switch
                checked={disabled === 'true'}
                onCheckedChange={(checkedValue) =>
                  setDisabled(`${checkedValue}`)
                }
              />
            </div>
          </div>

          <div className="px-2 pt-2 pb-2 flex items-center justify-between border-t border-muted">
            <Button
              variant={'outline'}
              size={'sm'}
              onClick={() => resetFilter()}
            >
              Reset
            </Button>

            <Button size={'sm'} onClick={() => applyFilter()}>
              Apply
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default AdminDashboardUsersFilter;

const FilterSection: FC<{ children: React.ReactNode; label: string }> = ({
  children,
  label,
}) => {
  return (
    <>
      <div>
        <span className="block pb-2 text-sm font-medium text-foreground/80">
          {label}
        </span>

        {children}
      </div>
    </>
  );
};
