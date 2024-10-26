import { FC } from 'react';
import { Badge } from './ui/badge';
import { cn } from '@/lib/cn';

interface Props {
  children: React.ReactNode;
  truthy: boolean;
}

const BooleanBadge: FC<Props> = ({ children, truthy }) => {
  return (
    <>
      <Badge
        className={cn(
          'capitalize',
          truthy
            ? 'bg-green-200 text-green-900 hover:bg-green-200 hover:text-green-900'
            : 'bg-red-200 text-red-900 hover:bg-red-200 hover:text-red-900'
        )}
      >
        {children}
      </Badge>
    </>
  );
};

export default BooleanBadge;
