'use client';

import { Registration } from 'RegistrationsTypes';
import { Dispatch, SetStateAction } from 'react';
import LineAccount from './LineAccount';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { Account } from 'AccountsTypes';

type DataProps = {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  accounts: Account[] | undefined | null;
};
export default function SearchListTable({
  isLoading,
  setIsLoading,
  accounts,
}: DataProps) {
  if (isLoading) {
    return (
      <p className="p-2 rounded-md border text-xl flex items-center text-rede-gray-400 bg-rede-gray-800 border-rede-gray-700 mb-4">
        <AiOutlineLoading3Quarters className="mr-1 animate-spin h-4 w-4 text-rede-gray-400" />{' '}
        Carregando...
      </p>
    );
  }

  return (
    <div>
      {accounts &&
        accounts.map((account: Account) => {
          return (
            <LineAccount key={account.account_cpf_cnpj} account={account} />
          );
        })}
    </div>
  );
}
