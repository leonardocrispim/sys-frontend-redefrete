'use client';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { RdVehicles } from '../../components/ListVehicles';
import { getVehiclesByAccountId } from '@/lib/vehicles/getVehiclesByAccountId';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

import { getDrivers } from '@/lib/drivers/getDrivers';

import { Driver } from 'DriversTypes';
import { FaRegSave } from 'react-icons/fa';
import { NewVehicle, Vehicle } from 'VehiclesTypes';
import { newVehicle } from '@/lib/vehicles/newVehicles';
import { ApiReturn } from 'UtilsTypes';
import OwnerInfos from './form-steps/OwnerInfos';
import VehicleInfos from './form-steps/VehicleInfo';
import VinculateDriver from './form-steps/VinculateDriver';

type FormValues = {
  license_plate: string;
  vehicle_type: string;
  driver_id: number;
  vehicle_renavam: string;
  vehicle_owner_name: string;
  vehicle_owner_cpf_cnpj: string;
  vehicle_owner_birth_date: string;
  vehicle_owner_sex: string;
  vehicle_owner_rg: string;
  vehicle_owner_rg_date: string;
  vehicle_owner_rg_uf: string;
  vehicle_owner_father_name: string;
  vehicle_owner_mother_name: string;
};

type PropsType = {
  account_id: number;
};

export default function newForm({ account_id }: PropsType) {
  const [saveError, setSaveError] = useState('');

  const [hasVehicleType, setHasVehicleType] = useState(false);
  const [vehicleRegistered, setVehicleRegistered] = useState(false);

  const [isCastrated, setIsCastrated] = useState<boolean | null>(false);

  const [vehicles, setVehicles] = useState<RdVehicles[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [drivers, setDrivers] = useState<Driver[] | null | undefined>(null);
  const [isEmpty, setIsEmpty] = useState<boolean>(false);

  const { data: session, status } = useSession();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<FormValues>();

  async function searchVehicles() {
    setVehicles([]);
    setIsLoading(true);

    try {
      const data = await getVehiclesByAccountId({
        account_id: account_id,
      });

      setVehicles(data);
    } catch (error) {
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  }

  async function searchDrivers() {
    setDrivers(null);
    setIsEmpty(false);
    setIsLoading(true);

    try {
      const data = await getDrivers({
        account_id: account_id,
      });

      if (data.data.length == 0) {
        setIsEmpty(false);
      }

      setDrivers(data.data);
    } catch (error) {
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    searchVehicles();
    searchDrivers();
  }, []);

  function formatDate(data: string) {
    let splited = data.split('/');
    let day = splited[0];
    let month = splited[1];
    let year = splited[2];

    const dateFormated = year + '-' + month + '-' + day;

    return dateFormated;
  }

  const onSubmit = (data: FormValues) => {
    setIsLoading(true);
    const vehicleData: NewVehicle = {
      license_plate: data.license_plate,
      vehicle_type: data.vehicle_type,
      vehicle_renavam: data.vehicle_renavam,
      vehicle_owner_name: data.vehicle_owner_name,
      vehicle_owner_birth_date: data?.vehicle_owner_birth_date
        ? formatDate(data.vehicle_owner_birth_date)
        : null,
      vehicle_owner_cpf_cnpj: data.vehicle_owner_cpf_cnpj,
      vehicle_owner_sex: data.vehicle_owner_sex,
      vehicle_owner_rg: data.vehicle_owner_rg,
      vehicle_owner_rg_date: data?.vehicle_owner_rg_date
        ? formatDate(data.vehicle_owner_rg_date)
        : null,
      vehicle_owner_rg_uf: data.vehicle_owner_rg_uf,
      vehicle_owner_father_name: data.vehicle_owner_father_name,
      vehicle_owner_mother_name: data.vehicle_owner_mother_name,
    };

    let hasErrorRg = false;

    if(vehicleData.vehicle_owner_rg?.length) {
      
      if(vehicleData.vehicle_owner_rg_date?.length !== 10) {
        setError('vehicle_owner_rg_date', {
          message: 'Digite uma data válida!',
        });
        hasErrorRg = true;
      }

      if(vehicleData.vehicle_owner_rg_uf == '') {
        setError('vehicle_owner_rg_uf', {
          message: 'Selecione o Estado de emissão!'
        })
        hasErrorRg = true
      }
    }
    if(hasErrorRg) {
      setIsLoading(false)
      return
    }

    newVehicle({
      vehicle: vehicleData,
      driver_id: data.driver_id,
      account_id: account_id,
    }).then((data: ApiReturn<Vehicle>) => {
      if (data.return == 'error') {
        setIsLoading(false);
      } else {
        router.push(
          `/admin/accounts/${account_id}/vehicles/${vehicleData.license_plate.replace(
            '-',
            ''
          )}`
        );
      }
    });
  };

  return (
    <>
      {isLoading && (
        <p className="p-2 rounded-md border text-xl flex items-center text-rede-gray-400 bg-rede-gray-800 border-rede-gray-700 mb-4">
          <AiOutlineLoading3Quarters className="mr-1 animate-spin h-4 w-4 text-rede-gray-400" />{' '}
          Carregando...
        </p>
      )}

      {vehicles && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <VehicleInfos
            register={register}
            errors={errors}
            setValue={setValue}
            vehicles={vehicles}
            saveError={saveError}
            vehicleRegistered={vehicleRegistered}
            hasVehicleType={hasVehicleType}
            setHasVehicleType={setHasVehicleType}
            setIsCastrated={setIsCastrated}
            setVehicleRegistered={setVehicleRegistered}
          />

          {hasVehicleType && (
            <OwnerInfos
              errors={errors}
              register={register}
              setValue={setValue}
            />
          )}

          {hasVehicleType && drivers && (
            <VinculateDriver
              register={register}
              errors={errors}
              isEmpty={isEmpty}
              drivers={drivers}
            />
          )}

          {hasVehicleType && (
            <div className="pt-4 sm:col-span-2">
              <button
                type="submit"
                disabled={isLoading}
                className={
                  `inline-flex justify-center rounded-lg text-sm font-semibold py-2 px-4 text-white hover:bg-rede-green-400 dark:bg-gray-200 dark:hover:bg-white dark:text-slate-900 w-full` +
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
          )}
        </form>
      )}
    </>
  );
}
