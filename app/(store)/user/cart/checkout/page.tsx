import BillingInformationForm from '@/components/billing-information-form';
import FormInput from '@/components/form-input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { DUMMY_PRODUCTS } from '@/dummy';
import Image from 'next/image';
import { FC } from 'react';

interface Props {}

const UserCartCheckoutPage: FC<Props> = () => {
  const product = DUMMY_PRODUCTS[0];

  return (
    <div className="container py-5">
      <div className="pb-4 md:pb-5">
        <h1 className="inline-block font-bold text-xl sm:text-2xl md:text-3xl">
          Checkout
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[6fr_4fr] lg:grid-cols-[6fr_3fr] gap-5">
        <div className="dark:bg-secondary/30 shadow-sm px-3 md:px-5 py-5 md:py-7 rounded-xl border self-start space-y-7">
          <div className="flex items-center justify-between">
            <h2 className="text-foreground/90 text-xl sm:text-2xl font-medium">
              Billing information
            </h2>

            <div className="flex items-center space-x-2">
              <span className="text-sm">Use saved</span>

              <Checkbox />
            </div>
          </div>

          {/* <BillingInformationForm /> */}

          {/* <div className="flex items-center space-x-2">
            <Checkbox />
            <span>Save billing information</span>
          </div> */}

          <div className="space-y-2">
            {Array.from({ length: 3 }).map((item, index) => (
              <div className="flex gap-2" key={index}>
                <span className="text-muted-foreground text-sm sm:text-base">
                  label:
                </span>

                <span className="text-foreground font-medium text-sm sm:text-base">
                  value
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="dark:bg-secondary/30 shadow-sm rounded-xl border md:sticky md:top-[90px] self-start py-3 md:py-5 mb-5 space-y-3">
          <h3 className="text-foreground/90 text-base sm:text-lg font-medium px-3 md:px-5">
            Order summary
          </h3>

          <div className="px-3 md:px-5">
            <Separator />
          </div>

          <ScrollArea className="h-40 sm:h-52 space-y-3 px-3 md:px-5">
            <ul className="space-y-3 pb-5">
              {Array.from({ length: 17 }).map((item, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <div className="w-[50px] sm:w-[70px] h-[50px] sm:h-[70px] bg-secondary rounded-md sm:rounded-lg flex items-center justify-center">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={426}
                      height={585}
                      className="max-w-[80%] max-h-[80%] object-contain"
                    />
                  </div>

                  <div>
                    <span className="block text-foreground/90 text-sm sm:text-base">
                      {product.name}{' '}
                      <span className="text-muted-foreground text-xs sm:text-sm">
                        (1 pcs)
                      </span>
                    </span>
                    <span className="block text-muted-foreground text-xs sm:text-sm">
                      ₦{product.price.toFixed(2)}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </ScrollArea>

          <div className="px-3 md:px-5">
            <Separator />
          </div>

          <div className="px-3 md:px-5 space-y-1">
            <span className="text-foreground/80 font-medium text-sm">
              Got a coupon code?
            </span>

            <div className="flex items-center gap-1">
              {/* <FormInput placeholder="Enter code" className="h-9" /> */}
              <Input placeholder="Enter code" />
              <Button className="h-9 font-normal">Apply</Button>
            </div>
          </div>

          <div className="px-3 md:px-5">
            <Separator />
          </div>

          <ul className="space-y-3 px-3 md:px-5">
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground text-sm sm:text-base font-medium">
                Subtotal
              </span>

              <span className="text-foreground/70 text-sm sm:text-base font-medium">
                ₦{product.price.toFixed(2)}
              </span>
            </li>

            <li className="flex items-center justify-between">
              <span className="text-muted-foreground text-sm sm:text-base font-medium">
                Discount
              </span>

              <span className="text-foreground/70 text-sm sm:text-base font-medium">
                ₦0.00
              </span>
            </li>

            <Separator />

            <li className="flex items-center justify-between">
              <span className="text-muted-foreground text-sm sm:text-base font-medium">
                Total
              </span>

              <span className="text-base sm:text-lg font-medium">
                ₦{product.price.toFixed(2)}
              </span>
            </li>
          </ul>

          <div className="px-3 md:px-5">
            <Separator />
          </div>

          <div className="px-3 md:px-5">
            <Button className="w-full">Place order</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCartCheckoutPage;
