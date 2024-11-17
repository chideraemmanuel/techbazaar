'use client';

import React, { FC } from 'react';
import FormInput from '@/components/form-input';
import { UseFormReturn } from 'react-hook-form';
import { COUNTRIES, NAME_REGEX } from '@/constants';
import ComboBoxInput from '@/components/combobox-input';
import { PhoneInput } from '@/components/phone-input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

export interface BillingInformationFormTypes {
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
  save_billing_information?: boolean;
}

interface Props {
  form: UseFormReturn<BillingInformationFormTypes, any, undefined>;
  isPlacingOrder: boolean;
}

const BillingInformationForm: FC<Props> = ({ form, isPlacingOrder }) => {
  const [countryComboboxOpen, setCountryComboboxOpen] = React.useState(false);
  const [stateComboboxOpen, setStateComboboxOpen] = React.useState(false);
  const [cityComboboxOpen, setCityComboboxOpen] = React.useState(false);

  const {
    register,
    formState: { errors },
    clearErrors,
    setValue,
  } = form;

  const formatted_countries = COUNTRIES.map((country) => {
    return {
      name: country,
      value: country,
    };
  });

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
          disabled={isPlacingOrder}
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
          disabled={isPlacingOrder}
        />

        <PhoneInput
          label="Mobile number"
          placeholder="+444 000 0000-0000"
          {...register('receipent.mobile_number', {
            required: {
              value: true,
              message: 'Please enter a mobile number',
            },
          })}
          onChange={(value) => {
            clearErrors('receipent.mobile_number');
            setValue('receipent.mobile_number', value);
          }}
          error={errors.receipent?.mobile_number?.message}
          disabled={isPlacingOrder}
        />

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
          error={errors?.address?.street?.message}
          disabled={isPlacingOrder}
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
          comboboxOpen={countryComboboxOpen}
          setComboboxOpen={setCountryComboboxOpen}
          error={errors.address?.country?.message}
          comboboxItems={formatted_countries}
          onItemSelect={(value) => {
            clearErrors('address');
            setValue('address.country', value);
          }}
          //  defaultValue={}
          disabled={isPlacingOrder}
        />

        <FormInput
          label="State"
          id="state"
          placeholder="Enter state"
          {...register('address.state', {
            required: {
              value: true,
              message: 'Please enter a state',
            },
            validate: (fieldValue) => {
              return (
                (fieldValue.length >= 2 && fieldValue.length <= 20) ||
                'Invalid state'
                // TODO: validate state properly
              );
            },
          })}
          error={errors?.address?.state?.message}
          disabled={isPlacingOrder}
        />

        <FormInput
          label="City"
          id="city"
          placeholder="Enter city"
          {...register('address.city', {
            required: {
              value: true,
              message: 'Please enter a city',
            },
            validate: (fieldValue) => {
              return (
                (fieldValue.length >= 2 && fieldValue.length <= 30) ||
                'Invalid city'
                // TODO: validate city properly
              );
            },
          })}
          error={errors?.address?.city?.message}
          disabled={isPlacingOrder}
        />

        {/* TODO: implement select fields for state and city  */}
        {/* <ComboBoxInput
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
          comboboxOpen={stateComboboxOpen}
          setComboboxOpen={setStateComboboxOpen}
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
          comboboxOpen={cityComboboxOpen}
          setComboboxOpen={setCityComboboxOpen}
          error={errors.address?.city?.message}
          comboboxItems={[]}
          onItemSelect={(value) => {
            clearErrors('address');
            setValue('address.city', value);
          }}
          //  defaultValue={}
          //  disabled={isPlacingOrder}
        /> */}
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="save_billing_information"
          onCheckedChange={(checked) =>
            setValue('save_billing_information', checked as boolean)
          }
        />
        <Label htmlFor="save_billing_information" className="cursor-pointer">
          Save billing information
        </Label>
      </div>
    </>
  );
};

export default BillingInformationForm;
