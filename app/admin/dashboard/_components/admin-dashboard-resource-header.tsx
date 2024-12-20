import { Skeleton } from '@/components/ui/skeleton';
import { APIPaginatedResponse } from '@/types';
import { FC, Suspense } from 'react';

interface Props {
  title: string;
  subtitle?: string;
  fetchFunction?: () => Promise<APIPaginatedResponse<any>>;
  breadcrumbs?: React.ReactNode;
}

const AdminDashboardResourceHeader: FC<Props> = ({
  title,
  subtitle,
  fetchFunction,
  breadcrumbs,
}) => {
  return (
    <>
      <div className="sticky top-16 md:top-20 z-[1] p-5 border-b bg-background">
        <div>
          {breadcrumbs}

          <h1 className="pb-3 pt-2 text-foreground font-bold text-2xl">
            {title}
          </h1>

          {subtitle && (
            <div className="text-foreground/90 text-base font-medium flex items-center">
              {subtitle}
              {fetchFunction && (
                <Suspense
                  fallback={<Skeleton className="inline-block h-5 w-5 ml-1" />}
                >
                  <TotalResource fetchFunction={fetchFunction} />
                </Suspense>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminDashboardResourceHeader;

interface TotalResourceProps {
  fetchFunction: () => Promise<APIPaginatedResponse<any>>;
}

const TotalResource: FC<TotalResourceProps> = async ({ fetchFunction }) => {
  const { pagination } = await fetchFunction();

  return (
    <>
      <span className="text-muted-foreground">
        ({pagination.total_records})
      </span>
    </>
  );
};
