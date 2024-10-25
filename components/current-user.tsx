import { FC } from 'react';
import { Avatar, AvatarFallback } from './ui/avatar';

interface Props {
  user: {
    first_name: string;
    last_name: string;
    email: string;
  };
}

const CurrentUser: FC<Props> = ({ user: { first_name, last_name, email } }) => {
  return (
    <>
      <div className="grid grid-cols-[auto_1fr] gap-2 items-center bg-secondary border border-border rounded-full p-2">
        <Avatar>
          <AvatarFallback
            className={`flex items-center justify-center p-[10px] w-10 h-10 rounded-full bg-primary text-primary-foreground font-semibold text-2xl tracking-[-3.44%]`}
          >
            {first_name.charAt(0).toUpperCase()}
            {/* C */}
          </AvatarFallback>
        </Avatar>

        <div className="flex flex-col">
          <span className="font-medium text-sm leading-[140%] tracking-[0.3%] text-secondary-foreground truncate w-[87%]">
            {/* Chidera Emmanuel */}
            {first_name} {last_name}
          </span>

          <span className="leading-[140%] text-xs text-muted-foreground truncate w-[87%]">
            {/* chidera@gmail.com */}
            {email}
          </span>
        </div>
      </div>
    </>
  );
};

export default CurrentUser;
