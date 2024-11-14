import { BODY_MIN_HEIGHT_WITH_HEADER } from '@/constants';
import { cn } from '@/lib/cn';
import { Loader2 } from 'lucide-react';
import { FC } from 'react';

interface Props {}

const SpinnerWithHeader: FC<Props> = () => {
  return (
    <>
      <div
        className={cn(
          BODY_MIN_HEIGHT_WITH_HEADER,
          'flex items-center justify-center'
        )}
      >
        <Loader2 className="w-10 h-10 animate-spin" />
      </div>
    </>
  );
};

export default SpinnerWithHeader;
