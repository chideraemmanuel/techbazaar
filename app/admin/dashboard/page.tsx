import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign } from 'lucide-react';
import { FC } from 'react';

interface Props {}

const AdminDashboardOverviewPage: FC<Props> = () => {
  return (
    <>
      <div className="px-6 py-6 h-full">
        <div className="flex flex-wrap items-center justify-between gap-6 pb-[30px]">
          <div>
            <span className="inline-block pb-2 font-bold text-muted-foreground text-[20px] leading-[140%] tracking-[-0.44%]">
              Welcome, Chidera. 👋🏾
            </span>

            <h1 className="text-foreground font-medium text-base leading-[140%] tracking-[0%]">
              Your Overview
            </h1>
          </div>

          <span className="text-xs font-semibold text-muted-foreground">
            Filter here!
          </span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 pb-4">
          {Array.from({ length: 4 }).map((value, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Revenue
                </CardTitle>

                <DollarSign className="text-muted-foreground h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$45,231.89</div>
                <p className="text-xs text-muted-foreground">
                  +20.1% from last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="h-[700px] border border-primary"></div>
      </div>
    </>
  );
};

export default AdminDashboardOverviewPage;
