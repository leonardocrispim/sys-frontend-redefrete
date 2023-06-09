'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Driver } from 'DriversTypes';
import FeedbackError from '@/components/utils/feedbacks/FeedbackError';
import { ApiReturn } from 'UtilsTypes';
import { useRouter } from 'next/navigation';

import DriverData from './form-steps/DriverData';
import DriverAddress from './form-steps/DriverAddress';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { FaRegSave } from 'react-icons/fa';
import VehicleData from './form-steps/VehicleData';
import { Registration } from 'RegistrationsTypes';
import { newRegistration } from '@/lib/registrations/newRegistrations';

export default function newForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [saveError, setSaveError] = useState('');

  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Registration>();

  const onSubmit = (data: Registration) => {
    setIsLoading(true);
    const dataNew: Registration = {
      ...data,
    };

    newRegistration(dataNew).then((data: ApiReturn<Driver>) => {
      if (data.return == 'error') {
        setSaveError(data.message || 'Erro. Contate o administrador!');
        setIsLoading(false);
      } else {
        router.replace(`/admin/registrations/${data.data?.driver_cpf_cnpj}`);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="pb-12">
      {saveError.length > 0 && <FeedbackError text={saveError} />}

      <div className="mb-2">
        <DriverData register={register} errors={errors} setValue={setValue} />
      </div>

      <div className="mb-4">
        <DriverAddress
          register={register}
          errors={errors}
          setValue={setValue}
        />
      </div>

      <div className="mb-2">
        <VehicleData register={register} errors={errors} setValue={setValue} />
      </div>

      <div>
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
