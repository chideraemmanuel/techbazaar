import RegionalPriceFormat from '@/components/regional-price-format';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getCurrentUser } from '@/lib/data/user';
import { DollarSign } from 'lucide-react';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { FC } from 'react';
import AdminDashboardAnalyticsFilter from './_components/admin-dashboard-analytics-filter';
import AdminDashboardAnalyticsChart from './_components/admin-dashboard-analytics-chart';

interface Props {}

const revenue_summary = {
  total: 74952631.89,
  last_month: 2793738.29,
};

const sales_summary = {
  total: 571,
  today: 17,
};

const orders_summary = {
  total: 485,
  today: 3,
};

const customers_summary = {
  total: 127,
  last_month: 21,
};

const AdminDashboardOverviewPage: FC<Props> = async () => {
  const headerList = await headers();
  const pathname = headerList.get('x-current-path') || '/admin/dashboard';

  const user = await getCurrentUser();

  if (!user) {
    redirect(`/auth/login?return_to=${encodeURIComponent(pathname)}`);
  }

  if (user && !user.email_verified) {
    redirect(`/auth/verify-email?return_to=${encodeURIComponent(pathname)}`);
  }
  return (
    <>
      <div className="px-6 py-6 h-full">
        <div className="flex flex-wrap items-center justify-between gap-6 pb-[30px]">
          <div>
            <span className="inline-block pb-2 font-bold text-muted-foreground text-xl">
              Welcome, {user.first_name}. 👋🏾
            </span>

            <h1 className="text-foreground font-medium text-base">
              Dashboard Overview
            </h1>
          </div>

          <AdminDashboardAnalyticsFilter />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 pb-4">
          <TotalCard
            title="Total Revenue"
            all_time_total={
              <RegionalPriceFormat
                price={revenue_summary.total}
                className="inline-block w-[100%] text-2xl font-bold truncate"
                title={`${revenue_summary.total}`}
              />
            }
            sub={
              <p className="text-xs text-muted-foreground">
                +
                <RegionalPriceFormat
                  price={revenue_summary.last_month}
                  className="text-xs text-muted-foreground"
                />{' '}
                in the last month
              </p>
            }
          />

          <TotalCard
            title="Sales"
            all_time_total={sales_summary.total}
            sub={`+${sales_summary.today} today`}
          />

          <TotalCard
            title="Orders"
            all_time_total={orders_summary.total}
            sub={`+${orders_summary.today} today`}
          />

          <TotalCard
            title="Customers"
            all_time_total={customers_summary.total}
            sub={`+${customers_summary.last_month} in the last month`}
          />
        </div>

        <AdminDashboardAnalyticsChart />
      </div>
    </>
  );
};

export default AdminDashboardOverviewPage;

const TotalCard: FC<{
  title: string;
  all_time_total: number | React.ReactNode;
  sub: string | React.ReactNode;
}> = ({ title, all_time_total, sub }) => {
  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>

          <DollarSign className="text-muted-foreground h-4 w-4" />
        </CardHeader>
        <CardContent>
          {typeof all_time_total === 'number' ? (
            <span className="text-2xl font-bold">{all_time_total}</span>
          ) : (
            all_time_total
          )}

          {typeof sub === 'string' ? (
            <p className="text-xs text-muted-foreground">{sub}</p>
          ) : (
            sub
          )}
        </CardContent>
      </Card>
    </>
  );
};
