import { APIPaginatedResponse } from '@/types';
import { FC, Suspense } from 'react';

interface Props {
  title: string;
  subtitle?: string;
  fetchFunction?: () => Promise<APIPaginatedResponse<any>>;
}

const AdminDashboardResourceHeader: FC<Props> = ({
  title,
  subtitle,
  fetchFunction,
}) => {
  return (
    <>
      <div className="sticky top-16 md:top-20 z-[1] p-5 border-b bg-background">
        <div>
          <span className="text-xs font-semibold text-muted-foreground">
            Breadcrumbs here!
          </span>

          <h1 className="pb-3 pt-2 text-foreground font-bold text-2xl">
            Orders
          </h1>

          {subtitle && (
            <div className="text-foreground/90 text-base font-medium">
              {subtitle}
              {fetchFunction && (
                <Suspense>
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
