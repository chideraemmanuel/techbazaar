import { cn } from '@/lib/cn';
import { Loader2 } from 'lucide-react';
import { FC } from 'react';

interface Props {}

const SpinnerWithoutHeader: FC<Props> = () => {
  return (
    <>
      <div
        className={cn(
          'fixed h-[100vh] w-[100vw] top-0 left-0 flex items-center justify-center'
        )}
      >
        <Loader2 className="w-10 h-10 animate-spin" />
      </div>
    </>
  );
};

export default SpinnerWithoutHeader;
