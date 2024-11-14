import { Loader2 } from 'lucide-react';
import { FC } from 'react';

interface Props {}

const SideFilterLoading: FC<Props> = () => {
  return (
    <>
      <div className="flex items-center justify-center h-full">
        <Loader2 className="animate-spin" />
      </div>
    </>
  );
};

export default SideFilterLoading;
