'use client';

import FormInput from '@/components/form-input';
import FullScreenSpinner from '@/components/full-screen-spinner';
import { Button } from '@/components/ui/button';
import useUpdateProfile from '@/lib/hooks/user/use-update-profile';
import { UserTypes } from '@/types/user';
import { Loader2 } from 'lucide-react';
import React, { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

interface IForm {
  first_name: string;
  last_name: string;
}

interface Props {
  user: UserTypes;
}

const PersonalDetailsUpdateForm: FC<Props> = ({ user }) => {
  const { mutate: updateProfile, isLoading: isUpdatingProfile } =
    useUpdateProfile();

  const [formChanged, setFormChanged] = React.useState(false);

  const form = useForm<IForm>({
    defaultValues: {
      first_name: user.first_name,
      last_name: user.last_name,
    },
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
    setValue,
    watch,
  } = form;

  // Track personal details form change
  const watched = watch();

  React.useEffect(() => {
    if (
      watched.first_name !== user.first_name ||
      watched.last_name !== user.last_name
    ) {
      setFormChanged(true);
    } else {
      setFormChanged(false);
    }
  }, [watched]);

  const onSubmit: SubmitHandler<IForm> = async (data, e) => {
    if (!formChanged) return;

    const values = getValues();

    const updates: Partial<IForm> = {};

    if (user.first_name !== values.first_name) {
      updates.first_name = values.first_name;
    }

    if (user.last_name !== values.last_name) {
      updates.last_name = values.last_name;
    }

    updateProfile(updates);
  };

  return (
    <>
      {isUpdatingProfile && <FullScreenSpinner />}

      <form className="w-[min(546px,_100%)]" onSubmit={handleSubmit(onSubmit)}>
        <div className="pb-9 flex flex-col space-y-5">
          <FormInput
            label="First Name"
            id="first_name"
            {...register('first_name', {
              required: {
                value: true,
                message: 'First name is required',
              },
            })}
            error={errors.first_name?.message}
            disabled={isUpdatingProfile}
          />
          <FormInput
            label="Last Name"
            id="last_name"
            {...register('last_name', {
              required: {
                value: true,
                message: 'Last name is required',
              },
            })}
            error={errors.last_name?.message}
            disabled={isUpdatingProfile}
          />
          <FormInput
            label="Email Address"
            value={user.email}
            disabled
            readOnly
          />
        </div>

        <Button
          className="self-start"
          disabled={isUpdatingProfile || !formChanged}
        >
          {isUpdatingProfile && <Loader2 className="h-4 w-4 animate-spin" />}
          Save changes
        </Button>
      </form>
    </>
  );
};

export default PersonalDetailsUpdateForm;
