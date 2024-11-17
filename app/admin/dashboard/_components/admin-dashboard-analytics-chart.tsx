'use client';

import { FC } from 'react';
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';
import { ANALYTICS } from '@/constants';

const AdminDashboardAnalyticsChart: FC = () => {
  const chart_config = {
    revenue: {
      label: 'Revenue',
      color: 'hsl(var(--chart-1))',
    },
    sales: {
      label: 'Sales',
      color: 'hsl(var(--chart-2))',
    },
    orders: {
      label: 'Orders',
      color: 'hsl(var(--chart-3))',
    },
    users: {
      label: 'Users',
      color: 'hsl(var(--chart-5))',
    },
  } satisfies ChartConfig;

  return (
    <>
      <ChartContainer
        config={chart_config}
        className="min-h-[200px] max-h-[80vh] w-full"
      >
        <AreaChart
          accessibilityLayer
          data={ANALYTICS}
          margin={{
            left: 12,
            right: 12,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tick={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="dot" />}
          />
          <Area
            dataKey="revenue"
            type="natural"
            fill="var(--color-revenue)"
            fillOpacity={0.4}
            stroke="var(--color-revenue)"
            stackId="a"
          />
          <Area
            dataKey="sales"
            type="natural"
            fill="var(--color-sales)"
            fillOpacity={0.4}
            stroke="var(--color-sales)"
            stackId="a"
          />
          <Area
            dataKey="orders"
            type="natural"
            fill="var(--color-orders)"
            fillOpacity={0.4}
            stroke="var(--color-orders)"
            stackId="a"
          />
          <Area
            dataKey="users"
            type="natural"
            fill="var(--color-users)"
            fillOpacity={0.4}
            stroke="var(--color-users)"
            stackId="a"
          />

          <ChartLegend content={<ChartLegendContent />} />
        </AreaChart>
      </ChartContainer>
    </>
  );
};

export default AdminDashboardAnalyticsChart;
