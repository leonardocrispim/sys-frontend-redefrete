'use client';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Driver } from 'DriversTypes';
import FeedbackError from '@/components/utils/feedbacks/FeedbackError';
import { ApiReturn } from 'UtilsTypes';
import { useRouter } from 'next/navigation';

import DriverData from './form-steps/DriverData';
import DriverAddress from './form-steps/DriverAddress';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { FaRegSave, FaUserEdit } from 'react-icons/fa';
import VehicleData from './form-steps/VehicleData';
import { Registration } from 'RegistrationsTypes';
import { newRegistration } from '@/lib/registrations/newRegistrations';
import { format } from 'path';
import {
  formatCPFCNPJ,
  formatPhone,
  formatPlate,
  formatZipCode,
} from '@/lib/utils/utils';

type DataType = {
  registration: Registration;
  setCurrentRegistration: React.Dispatch<React.SetStateAction<any>>;
  setTab: React.Dispatch<React.SetStateAction<'data' | 'edit'>>;
};

export default function RegistrationEdit({
  registration,
  setCurrentRegistration,
  setTab,
}: DataType) {
  const [isLoading, setIsLoading] = useState(false);
  const [saveError, setSaveError] = useState('');

  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Registration>();

  useEffect(() => {
    setValue('driver_name', registration.driver_name);
    setValue('driver_telephone', formatPhone(registration.driver_telephone));
    setValue('driver_email', registration.driver_email);

    setValue('address_street', registration.address_street);
    setValue('address_number', registration.address_number);
    setValue('address_complement', registration.address_complement);
    setValue('address_district', registration.address_district);
    setValue('address_city', registration.address_city);
    setValue('address_state', registration.address_state);
    setValue('address_zip_code', formatZipCode(registration.address_zip_code));

    setValue('vehicle_type', registration.vehicle_type);
    setValue(
      'vehicle_license_plate',
      formatPlate(registration.vehicle_license_plate)
    );
  }, []);

  const onSubmit = (data: Registration) => {
    setIsLoading(true);
    const dataNew: Registration = {
      ...data,
    };

    // newRegistration(dataNew).then((data: ApiReturn<Driver>) => {
    //   if (data.return == 'error') {
    //     setSaveError(data.message || 'Erro. Contate o administrador!');
    //     setIsLoading(false);
    //   } else {
    //     router.replace(`/admin/registrations/${data.data?.driver_cpf_cnpj}`);
    //   }
    // });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="pb-12">
      {saveError.length > 0 && <FeedbackError text={saveError} />}

      <div className="mb-2">
        <DriverData
          registration={registration}
          register={register}
          errors={errors}
          setValue={setValue}
        />
      </div>

      <div className="mb-4">
        <DriverAddress
          register={register}
          errors={errors}
          setValue={setValue}
          registration={registration}
        />
      </div>

      <div className="mb-5">
        <VehicleData
          register={register}
          errors={errors}
          setValue={setValue}
          registration={registration}
        />
      </div>

      <div className="flex justify-between">
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
          <span>SALVAR</span>
        </button>

        <button
          type="button"
          onClick={() => setTab('data')}
          disabled={isLoading}
          className={
            `inline-flex justify-center rounded-lg text-sm font-semibold py-2 px-6 text-white hover:bg-rede-red-600 dark:bg-gray-200 dark:hover:bg-white dark:text-slate-900 ` +
            (isLoading ? ' bg-rede-gray-400' : ' bg-rede-red-500')
          }
        >
          {isLoading ? (
            <AiOutlineLoading3Quarters className=" -ml-1 mr-2 h-5 w-5 text-white dark:text-slate-900 animate-spin " />
          ) : (
            <FaUserEdit className=" -ml-1 mr-2 h-5 w-5 text-white dark:text-slate-900" />
          )}
          <span>CANCELAR</span>
        </button>
      </div>
    </form>
  );
}
