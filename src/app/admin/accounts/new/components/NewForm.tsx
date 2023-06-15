'use client';
import { useState } from 'react';
import CpfMaskedInput from './maskedInputs/CpfMaskedInput';
import TelephoneMaskedInput from './maskedInputs/TelephoneMaskedInput';
import { FaRegSave } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { isValidEmail } from '@/lib/utils/utils';
import { useSession } from 'next-auth/react';
import { newDriver } from '@/lib/drivers/newDrivers';
import { Driver } from 'DriversTypes';
import FeedbackError from '@/components/utils/feedbacks/FeedbackError';
import { ApiReturn } from 'UtilsTypes';
import { useRouter } from 'next/navigation';
import {
  AiOutlineCheckSquare,
  AiOutlineLoading3Quarters,
} from 'react-icons/ai';
import { newAccount } from '@/lib/accounts/newAccounts';
import { Account } from 'AccountsTypes';

export default function newForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [saveError, setSaveError] = useState('');

  const { data: session, status } = useSession();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Account>();

  const onSubmit = (data: Account) => {
    setIsLoading(true);
    const dataNew: Account = {
      ...data,
      created_by: session?.userdata.user_id,
    };
    newAccount(dataNew)
      .then((data: ApiReturn<Account>) => {
        if (data.return == 'error') {
          throw new Error(data.message);
        } else {
          router.replace(`/admin/accounts/${data.data?.account_id}`);
        }
      })
      .catch((error) => {
        setSaveError(error.message || 'Erro. Contate o administrador!');
        setIsLoading(false);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="border rounded-md p-4">
        {saveError.length > 0 && <FeedbackError text={saveError} />}

        <div className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-6">
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Nome da Conta<sup className="text-red-700">*</sup>
            </label>
            <div className="mt-1">
              <input
                {...register('account_name', {
                  required: 'Nome obrigatório',
                  validate: (value: string) => {
                    if (value.split(' ').length < 2) {
                      return 'Digite o nome completo';
                    }
                    return true;
                  },
                })}
                type="text"
                name="account_name"
                id="account_name"
                placeholder="João da Silva"
                className="block bg-white w-full text-sm p-2 border rounded-md focus:outline-0 text-rede-gray-300 placeholder:text-rede-gray-500 placeholder:text-sm"
              />
            </div>
            {errors?.account_name && (
              <p className=" text-red-700 text-xs mt-1">
                {errors.account_name.message}
              </p>
            )}
          </div>

          <div className="sm:col-span-2">
            <CpfMaskedInput
              setValue={setValue}
              name="account_cpf_cnpj"
              register={register}
              errors={errors}
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Email
            </label>
            <div className="mt-1">
              <input
                {...register('account_email', {
                  validate: (value: string) => {
                    if (value.length == 0 || isValidEmail(value)) {
                      return true;
                    } else {
                      return 'Insira um email válido!';
                    }
                  },
                })}
                type="text"
                name="account_email"
                id="account_email"
                placeholder="motorista@redefrete.com.br"
                className="block bg-white w-full text-sm p-2 border rounded-md focus:outline-0 text-rede-gray-300 placeholder:text-rede-gray-500 placeholder:text-sm"
              />
              {errors?.account_email && (
                <p className=" text-red-700 text-xs mt-1">
                  {errors.account_email.message}
                </p>
              )}
            </div>
          </div>
          <div>
            <TelephoneMaskedInput
              setValue={setValue}
              name="account_telephone"
              register={register}
              errors={errors}
              title="Telefone"
            />
          </div>
          <div>
            <TelephoneMaskedInput
              setValue={setValue}
              name="account_whatsapp"
              register={register}
              errors={errors}
              title="Whatsapp"
            />
          </div>
        </div>
      </div>
      <div className="mt-4">
        <button
          type="submit"
          disabled={isLoading}
          className={
            `inline-flex justify-center rounded-lg text-sm font-semibold py-2 px-4 text-white hover:bg-rede-green-400 dark:bg-gray-200 dark:hover:bg-white dark:text-slate-900` +
            (isLoading ? ' bg-rede-gray-400' : ' bg-rede-green')
          }
        >
          {isLoading ? (
            <AiOutlineLoading3Quarters className=" -ml-1 mr-2 h-5 w-5 text-white dark:text-slate-900 animate-spin " />
          ) : (
            <FaRegSave className=" -ml-1 mr-2 h-5 w-5 text-white dark:text-slate-900" />
          )}
          <span>CADASTRAR</span>
        </button>
      </div>
    </form>
  );
}
