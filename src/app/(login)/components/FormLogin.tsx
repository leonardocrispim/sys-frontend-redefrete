'use client';

import * as React from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';

import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';

import SwitchTheme from './SwitchTheme';

type FormData = {
  username: string;
  password: string;
};

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function FormLogin() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const auth = searchParams.get('auth');

  useEffect(() => {
    if (auth == 'danied') {
      setError('Faça login para acessar o sistema');
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  async function onSubmit(data: FormData) {
    setError(null);
    setIsLoading(true);

    const signInResult = await signIn('credentials', {
      username: data.username,
      password: data.password,
      redirect: false,
    });

    if (signInResult?.error != null) {
      setError('Email ou senha inválidos');
      setIsLoading(false);
    } else {
      router.push('/admin');
    }
  }

  return (
    <div className="relative flex flex-1 flex-col items-center justify-center">
      <Image
        src="/images/logo-redefrete.png"
        alt="Redefrete"
        width={112}
        height={64}
      />

      <h1 className="mt-8 text-2xl font-bold sm:text-3xl sm:font-normal dark:text-gray-300">
        Sistema de Gerenciamento
      </h1>
      {error && (
        <div className="mt-4 text-red-500 dark:text-red-400">{error}</div>
      )}

      <form
        action="/login"
        className="w-full max-w-sm mt-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block dark:text-slate-100 text-sm font-semibold leading-6 text-gray-900"
          >
            Usuário
          </label>

          <input
            {...register('username', {
              required: 'Email obrigatório',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: 'Email inválido',
              },
            })}
            type="text"
            id="username"
            className="mt-1 appearance-none dark:bg-gray-700 dark:text-white text-slate-900 bg-white rounded-md block w-full px-3 h-10 focus:outline-none placeholder:text-slate-400  ring-1 ring-slate-400"
            placeholder="Digite seu usuário"
          />
          {errors?.username && (
            <p className="font-semibold text-red-700 text-xs mt-1">
              {errors.username.message}
            </p>
          )}
        </div>

        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-sm font-semibold leading-6 text-gray-900 dark:text-slate-300"
          >
            Senha
          </label>

          <input
            {...register('password', {
              required: 'Senha obrigatória',
            })}
            type="password"
            id="password"
            className="mt-1 appearance-none dark:bg-gray-700 dark:text-white text-slate-900 bg-white rounded-md block w-full px-3 h-10 focus:outline-none placeholder:text-slate-400 ring-1 ring-slate-400"
            placeholder="Digite sua senha"
          />

          {errors?.password && (
            <p className="font-semibold text-red-700 text-xs mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex  justify-center rounded-lg text-sm font-semibold py-2.5 px-4 bg-slate-800 text-white hover:bg-slate-700 dark:bg-gray-200 dark:hover:bg-white dark:text-slate-900 w-full"
        >
          {isLoading && (
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white dark:text-slate-900"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          )}
          ENTRAR
        </button>

        <div className="mt-8">
          <SwitchTheme />
        </div>
      </form>
    </div>
  );
}
