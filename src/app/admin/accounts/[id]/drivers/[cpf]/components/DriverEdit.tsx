'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { DriverInfos } from './form-steps/DriverInfos';
import { Driver } from 'DriversTypes';
import PageTitle from '@/components/utils/PageTitle';
import TagStatus from '@/components/drivers/TagStatus';
import {
  driversStatusRF,
  driversStatusRFKeys,
} from '@/lib/utils/driversConstants';
import AddressForm from './form-steps/AddressForm';
import DriverCnh from '../../new/components/form-steps/DriverCnh';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { FaRegSave } from 'react-icons/fa';
import { BiArrowBack } from 'react-icons/bi';
import { formatDateUs } from '@/lib/utils/formatDateUs';
import { alterDriver } from '@/lib/drivers/alterDriver';
import { ApiReturn } from 'UtilsTypes';

type DataType = {
  driver: Driver;
  isSaved: boolean;
  setIsSaved: React.Dispatch<React.SetStateAction<boolean>>;
  setTab: React.Dispatch<React.SetStateAction<'data' | 'edit'>>;
  setCurrentDriver: React.Dispatch<
    React.SetStateAction<Driver | null | undefined>
  >;
};

export default function DriverEdit({
  driver,
  isSaved,
  setIsSaved,
  setTab,
  setCurrentDriver,
}: DataType) {
  const [saveError, setSaveError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  console.log('DRIVER IN DRIVER EDIT', driver);

  const {
    register,
    handleSubmit,
    setValue,
    setFocus,
    setError,
    formState: { errors },
  } = useForm<Driver>();

  const onSubmit = (data: any) => {
    const dataFormated = {
      ...data,
      driver_birth_date: data.driver_birth_date
        ? formatDateUs(data.driver_birth_date)
        : '',
      driver_rg_date: data.driver_rg_date
        ? formatDateUs(data.driver_rg_date as string)
        : '',
      driver_cnh_first_license: data.driver_cnh_first_license
        ? formatDateUs(data.driver_cnh_first_license as string)
        : '',
      driver_cnh_validate: data.driver_cnh_validate
        ? formatDateUs(data.driver_cnh_validate as string)
        : '',
    };

    setIsLoading(true);

    alterDriver(driver.driver_id as number, dataFormated)
      .then((data: ApiReturn<Driver | null | undefined>) => {
        setIsLoading(false);

        if (data.return == 'error') {
          throw new Error(data.message || 'Erro. Contate o administrador!');
        } else {
          setCurrentDriver(data.data);
          setTab('data');
          setIsSaved(true);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        setIsSaved(false);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-4 mb-5">
        <div className="sm:col-span-2 flex items-center">
          <PageTitle>Edição do Motorista</PageTitle>
        </div>
        <div className="flex items-center">
          <div className="w-full"></div>
        </div>
        <div className="flex items-center">
          <div className="w-full">
            <div className="text-xs mb-1 text-center font-medium text-rede-gray-400">
              Redefrete
            </div>
            <TagStatus status={driver.driver_status}>
              {driversStatusRF[driver.driver_status as driversStatusRFKeys]}
            </TagStatus>
          </div>
        </div>
      </div>

      <DriverInfos
        register={register}
        errors={errors}
        setValue={setValue}
        saveError={saveError}
        driver={driver}
      />

      <AddressForm
        register={register}
        setValue={setValue}
        errors={errors}
        driver={driver}
      />

      <DriverCnh
        register={register}
        setValue={setValue}
        errors={errors}
        driver={driver}
      />

      <div className="flex justify-between mt-4 mb-6">
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
