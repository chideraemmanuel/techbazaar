import { cn } from '@/lib/cn';
import { Loader2 } from 'lucide-react';
import { FC } from 'react';

interface Props {}

const SpinnerWithHeader: FC<Props> = () => {
  return (
    <>
      <div
        className={cn(
          'flex items-center justify-center min-h-[calc(100vh-64px)] md:min-h-[calc(100vh-80px)]'
        )}
      >
        <Loader2 className="w-10 h-10 animate-spin" />
      </div>
    </>
  );
};

export default SpinnerWithHeader;
