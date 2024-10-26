import { FC } from 'react';

interface Props {
  title: string;
  total: number;
}

const AdminDashboardResourceHeader: FC<Props> = ({ title, total }) => {
  return (
    <>
      <div className="min-h-[calc(100vh-80px)] flex flex-col">
        <div className="sticky top-16 md:top-20 z-[1] p-6 flex flex-wrap justify-between gap-6 border-b bg-background">
          <div>
            <span className="text-xs font-semibold text-muted-foreground">
              Breadcrumbs here!
            </span>

            <h1 className="pb-3 pt-2 text-foreground font-bold text-[24px] leading-[140%] tracking-[0%]">
              {title}
            </h1>

            <div className="text-foreground/90 text-base font-medium leading-[140%] tracking-[0%]">
              All {title.toLowerCase()}{' '}
              <span className="text-muted-foreground">({total})</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboardResourceHeader;
