// types
import type { RegisterFormFieldTypes } from '@/pages/auth/auth.types';

import { useForm } from 'react-hook-form';
import InputField from '@/pages/auth/components/InputField';
import Button from '@/pages/auth/components/Button';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getIsPointerFine } from '@/helpers/helper';
import { useAuthContext } from '@/hooks/useAuthContext';

export default function RegisterAccount() {
  const { handleRegistration } = useAuthContext();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<RegisterFormFieldTypes>();

  const [isSubmitting, setIsSubmitting] = useState(false);

  async function requestRegistration(data: RegisterFormFieldTypes) {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      await handleRegistration(data);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div>
      <h1 className="mb-6 text-center text-2xl font-medium md:text-3xl">
        Create an account
      </h1>
      <form onSubmit={handleSubmit(requestRegistration)}>
        <InputField
          id="name"
          label="Name"
          placeholder="Your name"
          type="text"
          autoFocus={getIsPointerFine()}
          autoComplete="off"
          error={errors?.name?.message}
          {...register('name', {
            required: {
              message: 'Email is required',
              value: true,
            },
          })}
        />

        <InputField
          id="photoURL"
          label="Photo URL"
          placeholder="Your name"
          type="url"
          autoComplete="off"
          error={errors?.photoURL?.message}
          {...register('photoURL', {
            required: {
              message: 'PhotoURL is required',
              value: true,
            },
          })}
        />

        <InputField
          id="email"
          label="Email"
          type="email"
          autoComplete="off"
          placeholder="Your email"
          error={errors?.email?.message}
          {...register('email', {
            required: {
              message: 'Email is required',
              value: true,
            },
            pattern: {
              message: 'Email must be valid',
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            },
          })}
        />
        <InputField
          id="password"
          label="Password"
          type="password"
          autoComplete="off"
          placeholder="Your password"
          error={errors?.password?.message}
          {...register('password', {
            required: {
              message: 'Password is required',
              value: true,
            },
            minLength: {
              message: 'Must be 6 characters long',
              value: 6,
            },
            validate: (value: string) => {
              if (!/(?=.*[A-Z])/.test(value)) {
                return 'At least one uppercase character is required';
              }
              if (!/(?=.*[a-z])/.test(value)) {
                return 'At least one lowercase character is required';
              }
            },
          })}
        />

        <div className="py-3">
          <Button
            content="Register"
            isLoading={isSubmitting}
          />
        </div>

        <p className="flex justify-center gap-1 text-center text-sm">
          <span>Already have an account?</span>
          <Link
            className="text-brand hover:underline"
            to="/auth/login"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
