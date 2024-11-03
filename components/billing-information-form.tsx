'use client';

import React, { FC } from 'react';
import FormInput from './form-input';
import { useForm } from 'react-hook-form';
import { NAME_REGEX } from '@/constants';
import ComboBoxInput from './combobox-input';
import { PhoneInput } from './phone-input';

interface BillingInformationForm {
  receipent: {
    first_name: string;
    last_name: string;
    mobile_number: string;
  };
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
  };
}

interface Props {}

const BillingInformationForm: FC<Props> = () => {
  const [comboboxOpen, setComboboxOpen] = React.useState(false);
  const form = useForm<BillingInformationForm>();

  const {
    register,
    formState: { errors },
    handleSubmit,
    clearErrors,
    setValue,
  } = form;

  return (
    <>
      <div className="space-y-5">
        <FormInput
          label="First name"
          id="first_name"
          placeholder="e.g. Chidera"
          {...register('receipent.first_name', {
            required: {
              value: true,
              message: 'Please enter your first name',
            },
            pattern: {
              value: NAME_REGEX,
              message: 'First name contains invalid characters.',
            },
            validate: (fieldValue) => {
              return (
                (fieldValue.length >= 2 && fieldValue.length <= 50) ||
                'First name must be beteen 1-50 characters'
              );
            },
          })}
          error={errors?.receipent?.first_name?.message}
          // disabled={isPlacingOrder}
        />

        <FormInput
          label="Last name"
          id="last_name"
          placeholder="e.g. Emmanuel"
          {...register('receipent.last_name', {
            required: {
              value: true,
              message: 'Please enter your last name',
            },
            pattern: {
              value: NAME_REGEX,
              message: 'Last name contains invalid characters.',
            },
            validate: (fieldValue) => {
              return (
                (fieldValue.length >= 2 && fieldValue.length <= 50) ||
                'Last name must be beteen 1-50 characters'
              );
            },
          })}
          error={errors?.receipent?.last_name?.message}
          // disabled={isPlacingOrder}
        />

        <PhoneInput label="Mobile number" placeholder="+444 000 0000-0000" />

        <FormInput
          label="Address"
          id="street"
          placeholder="Enter address"
          {...register('address.street', {
            required: {
              value: true,
              message: 'Please enter a delivery address',
            },
            validate: (fieldValue) => {
              return (
                (fieldValue.length >= 2 && fieldValue.length <= 100) ||
                'Invalid address'
                // TODO: validate address properly
              );
            },
          })}
          error={errors?.receipent?.first_name?.message}
          // disabled={isPlacingOrder}
        />

        <ComboBoxInput
          label="Country"
          placeholder="Select country"
          comboboxTriggerProps={{
            ...register('address.country', {
              required: {
                value: true,
                message: 'Please select a country',
              },
            }),
            className: 'capitalize',
          }}
          comboboxItemProps={{ className: 'capitalize' }}
          comboboxOpen={comboboxOpen}
          setComboboxOpen={setComboboxOpen}
          error={errors.address?.country?.message}
          comboboxItems={[]}
          onItemSelect={(value) => {
            clearErrors('address');
            setValue('address.country', value);
          }}
          //  defaultValue={}
          //  disabled={isPlacingOrder}
        />

        <ComboBoxInput
          label="State"
          placeholder="Select state"
          comboboxTriggerProps={{
            ...register('address.state', {
              required: {
                value: true,
                message: 'Please select a state',
              },
            }),
            className: 'capitalize',
          }}
          comboboxItemProps={{ className: 'capitalize' }}
          comboboxOpen={comboboxOpen}
          setComboboxOpen={setComboboxOpen}
          error={errors.address?.state?.message}
          comboboxItems={[]}
          onItemSelect={(value) => {
            clearErrors('address');
            setValue('address.state', value);
          }}
          //  defaultValue={}
          //  disabled={isPlacingOrder}
        />

        <ComboBoxInput
          label="City"
          placeholder="Select city"
          comboboxTriggerProps={{
            ...register('address.city', {
              required: {
                value: true,
                message: 'Please select a city',
              },
            }),
            className: 'capitalize',
          }}
          comboboxItemProps={{ className: 'capitalize' }}
          comboboxOpen={comboboxOpen}
          setComboboxOpen={setComboboxOpen}
          error={errors.address?.city?.message}
          comboboxItems={[]}
          onItemSelect={(value) => {
            clearErrors('address');
            setValue('address.city', value);
          }}
          //  defaultValue={}
          //  disabled={isPlacingOrder}
        />
      </div>
    </>
  );
};

export default BillingInformationForm;
