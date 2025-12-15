import DashboardH1 from '@/components/DashboardH1';
import { useAuthContext } from '@/hooks/useAuthContext';
import InputField from '@/components/form/InputField';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import FraudFlag from '@/components/FraudFlag';

type ProfileUpdateTypes = {
  name: string;
  photoFiles: File[];
};

export default function VendorProfile() {
  const { user, updateProfileInfo } = useAuthContext();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ProfileUpdateTypes>();

  const [isSubmitting, setIsSubmitting] = useState(false);

  async function submitForm(data: ProfileUpdateTypes) {
    setIsSubmitting(true);
    if (isSubmitting) return;

    await updateProfileInfo(data.name, data.photoFiles);
    setIsSubmitting(false);
  }

  return (
    <div className="px-3 pb-16">
      <DashboardH1
        text={user?.role !== 'user' ? `Profile (${user?.role})` : 'Profile'}
      />

      <div className="mt-8 max-w-[800px] md:flex">
        <div className="md:flex-1">
          <div className="relative mx-auto size-[170px] overflow-hidden rounded-full shadow md:size-[230px]">
            <img
              className="size-full object-cover object-center"
              src={user?.photoURL}
              alt={`${user?.name} profile image`}
            />
            {user?.isFraud && (
              <div className="absolute inset-0 grid place-items-center bg-red-400/50">
                <FraudFlag />
              </div>
            )}
          </div>
        </div>

        <div className="md:flex-1">
          <form onSubmit={handleSubmit(submitForm)}>
            <InputField
              type="email"
              id="email"
              readOnly
              disabled
              label="Email"
              error={''}
              placeholder="Your Email"
              defaultValue={user?.email}
            />
            <InputField
              type="text"
              id="name"
              label="Name"
              error={errors.name?.message}
              placeholder="Your name"
              defaultValue={user?.name}
              {...register('name', {
                required: {
                  value: true,
                  message: 'Name is required',
                },
              })}
            />
            <InputField
              type="file"
              id="photoFile"
              label="Image File (optional):"
              accept="image/*"
              error={errors.photoFiles?.message}
              {...register('photoFiles')}
            />

            <div className="mt-4">
              <button
                type="submit"
                className="bg-brand h-10 w-[100px] rounded-full text-white"
              >
                {isSubmitting ? (
                  <span className="loading loading-spinner loading-xs"></span>
                ) : (
                  <span className="drop-shadow-xs drop-shadow-black/50">
                    Update
                  </span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
