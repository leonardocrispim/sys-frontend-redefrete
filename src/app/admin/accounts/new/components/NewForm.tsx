'use client';
import { useRef, useState } from 'react';
import { FaRegSave } from 'react-icons/fa';
import { useForm, Controller } from 'react-hook-form';
import { useSession } from 'next-auth/react';
import { ApiReturn } from 'UtilsTypes';
import { useRouter } from 'next/navigation';
import {
  AiOutlineCheckSquare,
  AiOutlineLoading3Quarters,
} from 'react-icons/ai';
import { newAccount } from '@/lib/accounts/newAccounts';
import { Account } from 'AccountsTypes';
import AddressForm from '../../[id]/drivers/new/components/form-steps/AddressForm';
import AccountInfos from './form-steps/AccountInfos';
import BankInfos from './form-steps/BankInfos';

export default function newForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [saveError, setSaveError] = useState('');

  const [createDriver, setCreateDriver] = useState<boolean>(false);

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

  const checkBoxNewDriver = useRef<HTMLInputElement>(null);

  function handleCheckNewDriver(): void {
    const isCheckedNewDriver = checkBoxNewDriver.current?.checked;

    if (isCheckedNewDriver) {
      setCreateDriver(true);
    } else {
      setCreateDriver(false);
    }
  }

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

    newAccount({ account: data, createDriver: createDriver })
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
      <AccountInfos
        errors={errors}
        register={register}
        setValue={setValue}
        saveError={saveError}
      />

      <AddressForm errors={errors} register={register} setValue={setValue} />

      <BankInfos
        errors={errors}
        register={register}
        handleBankAccountInput={handleBankAccountInput}
        handleBankAgencyInput={handleBankAgencyInput}
      />

      <div className="sm:col-span-4 flex border-b mb-2 p-2">
        <div className="mt-1">
          <input
            type="checkbox"
            className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
            onClick={handleCheckNewDriver}
            ref={checkBoxNewDriver}
          ></input>
        </div>

        <label className="block text-sm font-medium leading-6 text-gray-900 ml-2 mt-[3px]">
          Criar motorista com os mesmos dados
        </label>
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
