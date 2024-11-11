import { FC, Suspense } from 'react';
import Logo from '@/components/logo';
import { Button } from '@/components/ui/button';
import { RiMenuLine } from '@remixicon/react';
import FormInput from '@/components/form-input';
import { Search, ShoppingCart, User } from 'lucide-react';
import ResourceSearch from '@/components/resource-search';
import ThemeSwitcher from '@/components/theme-switcher';
import StoreHeaderSearch from './store-header-search';
import StoreHeaderAccountDropdown from './store-header-account-dropdown';
import Link from 'next/link';
import StoreHeaderCartLink from './store-header-cart-link';
import StoreSidebar from './store-sidebar';

interface Props {}

const StoreHeader: FC<Props> = () => {
  return (
    <>
      <header className="border-b shadow-sm sticky top-0 z-10 h-16 md:h-20 bg-background">
        <div className="container flex justify-between items-center space-x-10 h-full">
          <div className="flex items-center space-x-2">
            <StoreSidebar />

            <Logo />
          </div>

          <div className="flex items-center space-x-2">
            <StoreHeaderSearch />

            {/* <ThemeSwitcher /> */}

            <StoreHeaderCartLink />

            <Suspense>
              <StoreHeaderAccountDropdown />
            </Suspense>
          </div>
        </div>
      </header>
    </>
  );
};

export default StoreHeader;
