import type { LoginFormFieldTypes } from '@/pages/auth/auth.types';

import { useForm } from 'react-hook-form';
import InputField from '@/components/form/InputField';
import Button from '@/pages/auth/components/Button';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getIsPointerFine } from '@/helpers/helper';
import { useAuthContext } from '@/hooks/useAuthContext';

export default function Login() {
  const { handleLogin } = useAuthContext();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginFormFieldTypes>();

  const [isSubmitting, setIsSubmitting] = useState(false);

  async function requestLogin(data: LoginFormFieldTypes) {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      await handleLogin(data);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div>
      <h1 className="mb-6 text-center text-2xl font-medium md:text-3xl">
        Welcome back
      </h1>
      <form
        onSubmit={handleSubmit(requestLogin)}
        className="space-y-2.5"
      >
        <div>
          <InputField
            id="email"
            label="Email"
            type="email"
            autoFocus={getIsPointerFine()}
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
          <div className="relative">
            <InputField
              id="password"
              label="Password"
              type="password"
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
          </div>

          <button
            type="button"
            className={`text-brand flex overflow-hidden pl-2 text-sm`}
          >
            Forgot password?
          </button>
        </div>

        <Button
          content="Login"
          isLoading={isSubmitting}
        />

        <p className="flex justify-center gap-1 text-center text-sm">
          <span>Don't have an account?</span>
          <Link
            className="text-brand hover:underline"
            to="/auth/register"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
