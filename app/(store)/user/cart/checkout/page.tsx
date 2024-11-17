import { getCurrentUser } from '@/lib/data/user';
import { redirect } from 'next/navigation';
import { FC } from 'react';
import CheckoutContent from '../_components/checkout-content';
import {
  getCurrentUserBillingInformation,
  getCurrentUserCart,
} from '@/lib/data/cart';
import { headers } from 'next/headers';

interface Props {}

const UserCartCheckoutPage: FC<Props> = async () => {
  const headerList = await headers();
  const pathname = headerList.get('x-current-path') || '/user/cart/checkout';

  const user = await getCurrentUser();

  if (!user) {
    redirect(`/auth/login?return_to=${encodeURIComponent(pathname)}`);
  }

  if (user && !user.email_verified) {
    redirect(`/auth/verify-email?return_to=${encodeURIComponent(pathname)}`);
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
