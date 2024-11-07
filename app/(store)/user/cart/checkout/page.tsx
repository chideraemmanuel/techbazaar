import BillingInformationForm from '@/app/(store)/user/cart/_components/billing-information-form';
import FormInput from '@/components/form-input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { DUMMY_PRODUCTS } from '@/dummy';
import { getCurrentUser } from '@/lib/data/user';
import { ISearchParams } from '@/types';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { FC } from 'react';
import CheckoutContent from '../_components/checkout-content';
import {
  getCurrentUserBillingInformation,
  getCurrentUserCart,
} from '@/lib/data/cart';

interface Props {
  searchParams: Promise<ISearchParams>;
}

const UserCartCheckoutPage: FC<Props> = async ({ searchParams }) => {
  const searchParamsObject = await searchParams;
  const user = await getCurrentUser();

  if (!user) {
    redirect('/auth/login?return_to=/user/cart/checkout');
  }

  if (user && !user.email_verified) {
    redirect('/auth/verify-email?return_to=/user/cart/checkout');
  }

  const cart_promise = getCurrentUserCart();
  const billing_info_promise = getCurrentUserBillingInformation();

  const [cart, saved_billing_information] = await Promise.all([
    cart_promise,
    billing_info_promise,
  ]);

  if (cart.pagination.total_records === 0) {
    redirect('/user/cart');
  }

  return (
    <div className="container py-5">
      <div className="pb-4 md:pb-5">
        <h1 className="inline-block font-bold text-xl sm:text-2xl md:text-3xl">
          Checkout
        </h1>
      </div>

      <CheckoutContent saved_billing_information={saved_billing_information} />
    </div>
  );
};

export default UserCartCheckoutPage;
