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
import { Account, Account_Address } from 'AccountsTypes';
import { alterAccount } from '@/lib/accounts/alterAccounts';
import { ApiReturn } from 'UtilsTypes';
import AccountInfos from './form-steps/AccountInfos';
import AddressForm from './form-steps/AddressForm';
import BankInfos from './form-steps/BankInfos';
import { set } from 'date-fns';

type DataType = {
  account: Account_Address;
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
    setFocus,
    setError,
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

  const onSubmit = (data: Account) => {
    setIsLoading(true);

    alterAccount(account.account_id as number, data)
      .then((data: ApiReturn<Account_Address | any>) => {
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
    <form
      onSubmit={handleSubmit((data: Account) => {
        const [account, digit] = data.account_bank_account.split('-');

        const dataFormated: Account = {
          ...data,
          account_bank_account: account,
          account_bank_account_digit: digit,
          //created_by: 1,
        };

        onSubmit(dataFormated);
      })}
    >
      <AccountInfos
        register={register}
        setValue={setValue}
        errors={errors}
        saveError={setError}
        account={account}
      />

      <AddressForm
        errors={errors}
        register={register}
        setValue={setValue}
        account={account}
      />

      <BankInfos
        register={register}
        errors={errors}
        handleBankAccountInput={handleBankAccountInput}
        handleBankAgencyInput={handleBankAgencyInput}
        account={account}
      />

      <div className="flex justify-between mt-4">
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
      </div>
    </form>
  );
}
