'use client';
import { useEffect, useState } from 'react';
import CpfMaskedInput from './maskedInputs/CpfMaskedInput';
import TelephoneMaskedInput from './maskedInputs/TelephoneMaskedInput';
import { FaRegSave } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { isValidEmail } from '@/lib/utils/utils';
import { useSession } from 'next-auth/react';
import { newDriver } from '@/lib/drivers/newDrivers';
import { Driver } from 'DriversTypes';
import FeedbackError from '@/components/utils/feedbacks/FeedbackError';
import { ApiReturn } from 'UtilsTypes';
import { useRouter } from 'next/navigation';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { getVehiclesByAccountId } from '@/lib/vehicles/getVehiclesByAccountId';
import { Vehicle } from 'VehiclesTypes';
import { RdVehicles } from '../../../vehicles/components/ListVehicles';

type FormValues = {
  driver_name: string;
  driver_email: string;
  driver_cpf_cnpj: string;
  driver_telephone: string;
  license_plate: string;
};

type DataNewType = {
  account_id: number
  driver_name: string;
  driver_cpf_cnpj: string;
  driver_telephone?: string | null;
  driver_whatsapp?: string | null;
  driver_email?: string | null;
  driver_status: string;
  driver_status_gr: string;
  created_by?: number | null;
  license_plate: string;
}

type PropsType = {
  account_id: number;
};

export default function newForm({ account_id }: PropsType) {
  const [vehicles, setVehicles] = useState<RdVehicles[] | null | undefined>(null)
  const [isEmpty, setIsEmpty] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState(false);
  const [saveError, setSaveError] = useState('');

  console.log("VEHICLES", vehicles)

  const { data: session, status } = useSession();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>();

  async function searchVehicles() {
    setIsLoading(true)
    setVehicles(null)

    try {
      const data = await getVehiclesByAccountId({
        account_id: account_id
      })

      if (data && data.length == 0) {
        setIsEmpty(true)
      } else {
        setVehicles(data)
      }
    
    } catch (error) {
      console.log("erro para buscar veículos na criação de novo motorista", error)
      setIsLoading(false)
    
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    searchVehicles()
  }, [])

  const onSubmit = (data: FormValues) => {
    setIsLoading(true);
    const dataNew: DataNewType = {
      ...data,
      account_id: account_id,
      driver_status: 'NOVO_CADASTRO',
      driver_status_gr: 'NAO_ENVIADO',
      created_by: session?.userdata.user_id,
    };
    newDriver(dataNew).then((data: ApiReturn<Driver>) => {
      if (data.return == 'error') {
        setSaveError(data.message || 'Erro. Contate o administrador!');
        setIsLoading(false);
      } else {
        router.push(
          `/admin/accounts/${account_id}/drivers/${data.data?.driver_cpf_cnpj}`
        );
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="border rounded-md p-4">
        {saveError.length > 0 && <FeedbackError text={saveError} />}

        <div className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-4">
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Nome Completo<sup className="text-red-700">*</sup>
            </label>
            <div className="mt-1">
              <input
                {...register('driver_name', {
                  required: 'Nome obrigatório',
                  validate: (value: string) => {
                    if (value.split(' ').length < 2) {
                      return 'Digite o nome completo';
                    }
                    return true;
                  },
                })}
                type="text"
                name="driver_name"
                id="driver_name"
                placeholder="João da Silva"
                className="block bg-white w-full text-sm p-2 border rounded-md focus:outline-0 text-rede-gray-300 placeholder:text-rede-gray-500 placeholder:text-sm"
              />
            </div>
            {errors?.driver_name && (
              <p className=" text-red-700 text-xs mt-1">
                {errors.driver_name.message}
              </p>
            )}
          </div>

          <div className="sm:col-span-2">
            <CpfMaskedInput
              setValue={setValue}
              name="driver_cpf_cnpj"
              register={register}
              errors={errors}
            />
          </div>
          <div>
            <TelephoneMaskedInput
              setValue={setValue}
              name="driver_telephone"
              register={register}
              errors={errors}
              title="Telefone"
            />
          </div>
          <div>
            <TelephoneMaskedInput
              setValue={setValue}
              name="driver_whatsapp"
              register={register}
              errors={errors}
              title="Whatsapp"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Email
            </label>
            <div className="mt-1">
              <input
                {...register('driver_email', {
                  validate: (value: string) => {
                    if (value.length == 0 || isValidEmail(value)) {
                      return true;
                    } else {
                      return 'Insira um email válido!';
                    }
                  },
                })}
                type="text"
                name="driver_email"
                id="driver_email"
                placeholder="motorista@redefrete.com.br"
                className="block bg-white w-full text-sm p-2 border rounded-md focus:outline-0 text-rede-gray-300 placeholder:text-rede-gray-500 placeholder:text-sm"
              />
              {errors?.driver_email && (
                <p className=" text-red-700 text-xs mt-1">
                  {errors.driver_email.message}
                </p>
              )}
            </div>
          </div>
          <div className="sm:col-span-4">
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Relacionar motorista com veículo (opcional)
            </label>
            <div className="mt-1">
              
              <select
                {...register('license_plate')}
                className="block bg-white w-full text-sm p-2 border rounded-md focus:outline-0 text-rede-gray-300 placeholder:text-rede-gray-500 placeholder:text-sm"
                name='license_plate'
                id='license_plate'
              >
                  <>
                    {isEmpty ? (
                      <option value={""}>
                        -- Nenhum veículo cadastrado nesta conta --
                      </option>
                    ) : (
                      
                      <option value={""}>-- Selecione a placa --</option>
                    )}
      
                      {vehicles ? (
                        vehicles.map((vehicle: RdVehicles) => (
                          <option value={vehicle.rd_vehicles.license_plate} key={vehicle.rd_vehicles.vehicle_id}>
                            {vehicle.rd_vehicles.license_plate}
                          </option>
                      ))
                    ) : (
                      <></>
                    )}
                  </>

              </select>
            </div>
          </div>
          <div className="pt-4">
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
        </div>
      </div>
    </form>
  );
}
