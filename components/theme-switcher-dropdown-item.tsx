'use client';

import { useTheme } from '@/providers/theme-provider';
import { FC } from 'react';
import { Switch } from './ui/switch';

interface Props {}

const ThemeSwitcherDropdownItem: FC<Props> = () => {
  const { theme, setTheme } = useTheme();

  return (
    <>
      <div className="flex items-center justify-between p-2">
        <span className="text-sm">Dark mode</span>

        <Switch
          checked={theme === 'dark'}
          onCheckedChange={(checked) => {
            if (checked) {
              setTheme('dark');
            } else {
              setTheme('light');
            }
          }}
        />
      </div>
    </>
  );
};

export default ThemeSwitcherDropdownItem;
