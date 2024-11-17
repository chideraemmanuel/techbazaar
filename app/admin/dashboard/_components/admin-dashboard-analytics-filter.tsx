'use client';

import SelectInput from '@/components/select-input';
import { RiCalendar2Line } from '@remixicon/react';
import { FC } from 'react';

interface Props {}

const AdminDashboardAnalyticsFilter: FC<Props> = () => {
  return (
    <>
      <SelectInput
        icon={<RiCalendar2Line className="mr-1 w-4 h-4" />}
        placeholder="Filter"
        selectInputItems={[
          { name: 'Last 7 days', value: '7d' },
          { name: 'Last 30 days', value: '30d' },
          { name: 'Last 60 days', value: '60d' },
          { name: 'Last 90 days', value: '90d' },
        ]}
        selectInputItemProps={{ className: 'capitalize' }}
        selectInputTriggerProps={{
          className: 'capitalize p-4 text-sm',
        }}
        defaultValue={'7d'}
        onItemSelect={(value) => {}}
      />
    </>
  );
};

export default AdminDashboardAnalyticsFilter;
