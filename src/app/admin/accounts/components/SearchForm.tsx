'use client';
import { Dispatch, SetStateAction, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlineSearch } from 'react-icons/ai';

type SearchFormProps = {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;

  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
};

type FormData = {
  s: string;
};

export default function SearchForm({
  isLoading,
  setIsLoading,
  search,
  setSearch,
}: SearchFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  async function onSubmit(data: FormData) {
    setSearch(data.s);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 sm:grid-cols-6 gap-4">
        <div className="sm:col-span-3">
          <input
            {...register('s')}
            type="search"
            name="s"
            id="s"
            defaultValue={search || ''}
            placeholder="Nome, cpf, email, placa..."
            autoComplete="address-level1"
            className="block bg-white w-full text-sm p-2 border rounded-md focus:outline-0 text-rede-gray-300 placeholder:text-rede-gray-500 placeholder:text-sm"
          />
        </div>

        <div className="">
          <button
            type="submit"
            disabled={isLoading}
            className={
              `inline-flex justify-center rounded-lg text-sm font-semibold py-2 px-4 text-white hover:bg-rede-blue-400 dark:bg-gray-200 dark:hover:bg-white dark:text-slate-900 w-full` +
              (isLoading ? ' bg-rede-gray-400' : ' bg-rede-blue')
            }
          >
            <span>BUSCAR</span>
            <AiOutlineSearch className=" -mr-1 ml-3 h-5 w-5 text-white dark:text-slate-900" />
          </button>
        </div>
      </div>
    </form>
  );
}
function setSearch(s: any) {
  throw new Error('Function not implemented.');
}
