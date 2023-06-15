'use client';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import FeedbackError from '@/components/utils/feedbacks/FeedbackError';

import { AiOutlineLoading3Quarters, AiFillCloseCircle } from 'react-icons/ai';
import { BiArrowBack } from 'react-icons/bi';
import { FaRegSave, FaUserEdit } from 'react-icons/fa';

import {
  formatCPFCNPJ,
  formatPhone,
  formatPlate,
  formatZipCode,
  isValidEmail,
} from '@/lib/utils/utils';
import { alterRegistration } from '@/lib/registrations/alterRegistrations';
import { Account } from 'AccountsTypes';
import TelephoneMaskedInput from './maskedInputs/TelephoneMaskedInput';
import CpfMaskedInput from './maskedInputs/CpfMaskedInput';
import { alterAccount } from '@/lib/accounts/alterAccounts';
import { ApiReturn } from 'UtilsTypes';

type DataType = {
  account: Account;
  setCurrentAccount: React.Dispatch<React.SetStateAction<any>>;
  setIsSaved: React.Dispatch<React.SetStateAction<boolean>>;
  setTab: React.Dispatch<React.SetStateAction<'data' | 'edit'>>;
};

export default function AccountEdit({
  account,
  setCurrentAccount,
  setTab,
  setIsSaved,
}: DataType) {
  const [isLoading, setIsLoading] = useState(false);
  const [saveError, setSaveError] = useState('');

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Account>();

  useEffect(() => {
    setValue('account_name', account.account_name);
    setValue('account_cpf_cnpj', formatCPFCNPJ(account.account_cpf_cnpj));
    setValue('account_telephone', formatPhone(account.account_telephone));

    setValue(
      'account_whatsapp',
      account.account_whatsapp ? formatPhone(account.account_whatsapp) : ''
    );
    setValue('account_email', account.account_email);
  }, []);

  const onSubmit = (data: Account) => {
    setIsLoading(true);

    alterAccount(account.account_id as number, data)
      .then((data: ApiReturn<Account>) => {
        setIsLoading(false);

        if (data.return == 'error') {
          throw new Error(data.message || 'Erro. Contate o administrador!');
        } else {
          setCurrentAccount(data.data);
          setTab('data');
          setIsSaved(true);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        setIsSaved(false);
        setSaveError(error.message || 'Erro. Contate o administrador!');
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {saveError.length > 0 && <FeedbackError text={saveError} />}

      <div className="mb-5 border rounded-md p-4">
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
              value={account.account_cpf_cnpj}
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
              value={account.account_telephone}
            />
          </div>
          <div>
            <TelephoneMaskedInput
              setValue={setValue}
              name="account_whatsapp"
              register={register}
              errors={errors}
              title="Whatsapp"
              value={account.account_whatsapp as string}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <div>
          <button
            type="submit"
            disabled={isLoading}
            className={
              `mr-2 inline-flex justify-center rounded-lg text-sm font-semibold py-2 px-4 text-white hover:bg-rede-green-400 dark:bg-gray-200 dark:hover:bg-white dark:text-slate-900` +
              (isLoading ? ' bg-rede-gray-400' : ' bg-rede-green')
            }
          >
            {isLoading ? (
              <AiOutlineLoading3Quarters className=" -ml-1 mr-2 h-5 w-5 text-white dark:text-slate-900 animate-spin " />
            ) : (
              <FaRegSave className=" -ml-1 mr-2 h-5 w-5 text-white dark:text-slate-900" />
            )}
            <span>SALVAR</span>
          </button>

          {!isLoading && (
            <button
              type="button"
              onClick={() => setTab('data')}
              className={`inline-flex justify-center rounded-lg text-sm font-semibold py-2 px-6 text-white hover:bg-rede-blue-400 dark:bg-gray-200 dark:hover:bg-white dark:text-slate-900 bg-rede-blue`}
            >
              <BiArrowBack className=" -ml-1 mr-2 h-5 w-5 text-white dark:text-slate-900" />
              <span>VOLTAR</span>
            </button>
          )}
        </div>

        {/* <div>
          {!isLoading && (
            <button
              type="button"
              onClick={() => setTab('data')}
              className={`inline-flex justify-center rounded-lg text-sm font-semibold py-2 px-6 text-white hover:bg-rede-red-600 dark:bg-gray-200 dark:hover:bg-white dark:text-slate-900 bg-rede-red-500`}
            >
              <AiFillCloseCircle className=" -ml-1 mr-2 h-5 w-5 text-white dark:text-slate-900" />
              <span>EXCLUIR PRÉ-CADASTRO</span>
            </button>
          )}
        </div> */}
      </div>
    </form>
  );
}
