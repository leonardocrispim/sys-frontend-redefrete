'use client';
import { useState } from 'react';
import CpfMaskedInput from './maskedInputs/CpfMaskedInput';
import TelephoneMaskedInput from './maskedInputs/TelephoneMaskedInput';
import { FaRegSave } from 'react-icons/fa';
import { useForm, Controller } from 'react-hook-form';
import { isValidEmail } from '@/lib/utils/utils';
import { useSession } from 'next-auth/react';
import FeedbackError from '@/components/utils/feedbacks/FeedbackError';
import { ApiReturn } from 'UtilsTypes';
import { useRouter } from 'next/navigation';
import {
  AiOutlineCheckSquare,
  AiOutlineLoading3Quarters,
} from 'react-icons/ai';
import { newAccount } from '@/lib/accounts/newAccounts';
import { Account } from 'AccountsTypes';

import { banks } from '@/lib/utils/utilsBanks';

export default function newForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [saveError, setSaveError] = useState('');

  const { data: session, status } = useSession();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    setFocus,
    setError,
    formState: { errors },
  } = useForm<Account>();

  //Formatação input do número da agência bancária
  const handleBankAgencyInput = (e: any) => {
    let value = e.target.value;

    value = value.replace(/\D/g, '');

    if (value.length > 5) {
      value = value.slice(0, 6);
      e.target.value = value;
      setFocus('account_bank_account');
    }

    setValue('account_bank_agency', value);
  };

  //Formatação input do número da conta bancária
  const formatBankAccountNumber = (input: any) => {
    const value = input.replace(/[^0-9]/g, ''); // Remove todos os caracteres não numéricos
    const length = value.length;

    if (length >= 2) {
      const firstPart = value.slice(0, length - 1);
      const lastDigit = value.slice(length - 1);

      return `${firstPart}-${lastDigit}`;
    } else {
      return value;
    }
  };

  //Formatação input do número da conta bancária
  const handleBankAccountInput = (event: any) => {
    const formattedValue = formatBankAccountNumber(event.target.value);
    event.target.value = formattedValue;
  };

  const getAccountNumbers = (data: string) => {
    const indexHifen = data.indexOf('-');

    if (indexHifen === -1) {
      return data;
    }

    return data.slice(0, indexHifen);
  };

  const getAccountDigit = (data: string) => {
    const indexHifen = data.indexOf('-');

    if (indexHifen === -1) {
      return '';
    }

    return data.slice(indexHifen + 1);
  };

  function submitForm(data: Account) {
    setIsLoading(true);

    if (data.account_bank_number != '') {
      if (
        !(
          data.account_bank_agency.length == 4 ||
          data.account_bank_agency.length == 6
        )
      ) {
        setError('account_bank_agency', {
          message: 'Digite os dados da agência',
        });
        setIsLoading(false);
        return;
      }

      if (data.account_bank_account.length < 5) {
        setError('account_bank_account', {
          message: 'Digite os dados da conta',
        });
        setIsLoading(false);
        return;
      }
    }

    newAccount(data)
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
  }

  return (
    <form
      onSubmit={handleSubmit((data: Account) => {
        const dataFormat: Account = {
          ...data,
          account_bank_account: getAccountNumbers(data.account_bank_account),
          account_bank_account_digit: getAccountDigit(
            data.account_bank_account
          ),
          created_by: session?.userdata.user_id,
        };

        submitForm(dataFormat);
      })}
    >
      <div className="border rounded-md p-4">
        {saveError.length > 0 && <FeedbackError text={saveError} />}

        <div className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-6">
          <div className="mb-2 sm:col-span-6">
            <h2 className="font-semibold text-gray-800 text-xl underline-offset-8 underline">
              Dados da Conta
            </h2>
          </div>
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
                  required: 'E-mail obrigatório',
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

      <div className=" mt-6 border rounded-md p-4">
        <div className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-6">
          <div className="mb-2 sm:col-span-6">
            <h2 className="font-semibold text-gray-800 text-xl underline-offset-8 underline">
              Dados Bancários
            </h2>
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Selecione o Banco
            </label>
            <div className="mt-1">
              <select
                {...register('account_bank_number')}
                className="block bg-white w-full text-sm p-2 border rounded-md focus:outline-0 text-rede-gray-300 placeholder:text-rede-gray-500 placeholder:text-sm"
                name="account_bank_number"
                id="account_bank_number"
              >
                <>
                  {banks.map((bank) => {
                    return (
                      <option value={bank.bankNumber} key={bank.bankName}>
                        {bank.bankName}
                      </option>
                    );
                  })}
                </>
              </select>
              {errors?.account_name && (
                <p className=" text-red-700 text-xs mt-1">
                  {errors.account_bank_number?.message}
                </p>
              )}
            </div>
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Agência bancária
            </label>
            <div className="mt-1">
              <input
                {...register(
                  'account_bank_agency' /*, {
                  required: 'Agência obrigatório',
                  maxLength: {
                    value: 6,
                    message: 'Máximo de 6 dígitos',
                  },
                  minLength: {
                    value: 4,
                    message: 'Mínimo 4 dígitos necessário',
                  },
                }*/
                )}
                className="block bg-white w-full text-sm p-2 border rounded-md focus:outline-0 text-rede-gray-300 placeholder:text-rede-gray-500 placeholder:text-sm"
                name="account_bank_agency"
                id="account_bank_agency"
                type="text"
                placeholder="0000"
                onInput={handleBankAgencyInput}
              ></input>
              {errors.account_bank_agency && (
                <p className=" text-red-700 text-xs mt-1">
                  {errors.account_bank_agency.message}
                </p>
              )}
            </div>
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Conta Bancária
            </label>
            <div className="mt-1">
              <input
                {...register('account_bank_account')}
                className="block bg-white w-full text-sm p-2 border rounded-md focus:outline-0 text-rede-gray-300 placeholder:text-rede-gray-500 placeholder:text-sm"
                name="account_bank_account"
                id="account_bank_account"
                type="text"
                placeholder="00000000-0"
                onInput={handleBankAccountInput}
              ></input>
              {errors.account_bank_account && (
                <p className=" text-red-700 text-xs mt-1">
                  {errors.account_bank_account.message}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <button
          type={'submit'}
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
