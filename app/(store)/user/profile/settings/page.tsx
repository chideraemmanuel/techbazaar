import { getCurrentUser } from '@/lib/data/user';
import { redirect } from 'next/navigation';
import { FC } from 'react';
import PersonalDetailsUpdateForm from './_components/personal-details-update-form';
import PasswordUpdateForm from './_components/password-update-form';

interface Props {}

const ProfileSettingsPage: FC<Props> = async () => {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/auth/login?return_to=/user/profile/settings');
  }

  if (user && !user.email_verified) {
    redirect('/auth/verify-email?return_to=/user/profile/settings');
  }

  return (
    <>
      <div className="container py-5 md:py-7 flex flex-col min-h-[80vh]">
        <div className="pb-4 md:pb-5">
          <span className="block pb-1 md:pb-2 text-muted-foreground font-medium text-sm sm:text-base">
            Hello, {user.first_name}
          </span>

          <h1 className="inline-block font-bold text-xl sm:text-2xl md:text-3xl">
            Manage profile
          </h1>
        </div>

        <div className="flex-1 flex flex-col gap-12 shadow-sm bg-secondary/30 dark:bg-secondary/20 px-5 md:px-8 py-9 rounded-xl border">
          <div className="flex flex-col md:flex-row items-start gap-4 md:gap-5">
            <div className="flex flex-col gap-1 min-w-80">
              <h3 className="font-bold text-base">Personal Information</h3>
              <p className="text-muted-foreground text-sm max-w-[auto] md:max-w-[90%]">
                Update your personal details here
              </p>
            </div>

            <PersonalDetailsUpdateForm user={user} />
          </div>

          {user.auth_type === 'manual' && (
            <div className="flex flex-col md:flex-row items-start gap-4 md:gap-5">
              <div className="flex flex-col gap-1 min-w-80">
                <h3 className="font-bold text-base">Account Password</h3>
                <p className="text-muted-foreground text-sm max-w-[auto] md:max-w-[90%]">
                  Update your account password here
                </p>
              </div>

              <div className="w-[min(546px,_100%)]">
                <div className="flex flex-col gap-12">
                  <div>
                    <h4 className="mb-4 font-bold text-xl hidden md:block">
                      Create a new password
                    </h4>

                    <PasswordUpdateForm />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProfileSettingsPage;
