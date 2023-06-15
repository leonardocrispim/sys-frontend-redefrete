'use client';

import { Registration } from 'RegistrationsTypes';
import { Dispatch, SetStateAction } from 'react';
import LineRegistration from './LineRegistration';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

type DataProps = {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  registrations: Registration[] | undefined | null;
};
export default function SearchListTable({
  isLoading,
  setIsLoading,
  registrations,
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
      {registrations &&
        registrations.map((registration: Registration) => {
          return (
            <LineRegistration
              key={registration.driver_cpf_cnpj}
              registration={registration}
            />
          );
        })}
    </div>
  );
}
