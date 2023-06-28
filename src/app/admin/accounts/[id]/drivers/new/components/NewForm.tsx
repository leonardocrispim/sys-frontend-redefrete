'use client';
import { useEffect, useRef, useState } from 'react';
import { FaRegSave } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { useSession } from 'next-auth/react';
import { newDriver } from '@/lib/drivers/newDrivers';
import { Driver } from 'DriversTypes';
import { ApiReturn } from 'UtilsTypes';
import { useRouter } from 'next/navigation';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { getVehiclesByAccountId } from '@/lib/vehicles/getVehiclesByAccountId';
import { RdVehicles } from '../../../vehicles/components/ListVehicles';
import { Account } from 'AccountsTypes';
import { getAccount } from '@/lib/accounts/getAccounts';
import DriverAddress from './form-steps/DriverAddress';
import { DriverInfo } from './form-steps/DriverInfos';

type FormValues = {
  driver_name: string;
  driver_email: string;
  driver_cpf_cnpj: string;
  driver_telephone: string;
  driver_whatsapp: string
  license_plate: string;
  address_zip_code: string;
  address_street: string;
  address_number: string;
  address_complement: string;
  address_district: string;
  address_city: string;
  address_state: string;
};

type DataNewType = {
  account_id: number;
  driver_name: string;
  driver_cpf_cnpj: string;
  driver_telephone?: string | null;
  driver_whatsapp?: string | null;
  driver_email?: string | null;
  driver_status: string;
  driver_status_gr: string;
  created_by?: number | null;
  license_plate: string;
  address_zip_code: string;
  address_street: string;
  address_number: string;
  address_complement: string;
  address_district: string;
  address_city: string;
  address_state: string;
};

type PropsType = {
  account_id: number;
};

export default function newForm({ account_id }: PropsType) {
  const [vehicles, setVehicles] = useState<RdVehicles[] | null | undefined>(null);
  const [account, setAccount] = useState<Account | null | undefined>(null)
  
  const [isEmpty, setIsEmpty] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [saveError, setSaveError] = useState('');

  const [isChecked, setIsChecked] = useState<boolean>(false)
  const [isCheckedAddress, setIsCheckedAddress] = useState<boolean>(false)

  const { data: session, status } = useSession();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>();

  const checkBoxRef = useRef<HTMLInputElement>(null);
  
  function handleCheck(): void {
    const isChecked = checkBoxRef.current?.checked

    if(isChecked) {
      setIsChecked(true)
      setValue('driver_name', account?.account_name ? account.account_name : "")
      setValue('driver_cpf_cnpj', account?.account_cpf_cnpj ? account.account_cpf_cnpj : "")
      setValue('driver_telephone', account?.account_telephone ? account.account_telephone : "")
      setValue('driver_email', account?.account_email ? account.account_email : "")
      setValue('driver_whatsapp', account?.account_whatsapp ? account.account_whatsapp : "")
    } else {
      setIsChecked(false)
      setValue('driver_name', "")
      setValue('driver_cpf_cnpj', "")
      setValue('driver_telephone', "")
      setValue('driver_email', "")
      setValue('driver_whatsapp', "")
    }
  }

  const checkBoxAddressRef = useRef<HTMLInputElement>(null)

  function handleCheckAddress(): void {
    const isCheckedAddress = checkBoxAddressRef.current?.checked

    if(isCheckedAddress) {
      setIsCheckedAddress(true)
      setValue('address_zip_code', account?.address_zip_code ? account.address_zip_code : "25665442")
      setValue('address_street', account?.address_street ? account.address_street : "Rua tal tal")
      setValue('address_number', account?.address_number ? account.address_number : "10")
      setValue('address_complement', account?.address_complement ? account.address_complement : "Apto 301")
      setValue('address_city', account?.address_city ? account.address_city : "Petrópolis")
      setValue('address_state', account?.address_state ? account.address_state : "RJ")
    } else {
      setIsCheckedAddress(false)
      setValue('address_zip_code', "")
      setValue('address_street', "")
      setValue('address_number', "")
      setValue('address_complement', "")
      setValue('address_city', "")
      setValue('address_state', "")
    }
  }

  async function searchVehicles() {
    setIsLoading(true);
    setVehicles(null);

    try {
      const data = await getVehiclesByAccountId({
        account_id: account_id,
      });

      if (data && data.length == 0) {
        setIsEmpty(true);
      } else {
        setVehicles(data);
      }
    } catch (error) {
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  }

  async function searchAccountInfo() {
    setIsLoading(true)
    setAccount(null)

    try {
      const data = await getAccount(account_id)

      setAccount(data.data)
    } catch (error) {
      setIsLoading(false)
    } finally {
      setIsLoading(false)
    }
    
  }

  useEffect(() => {
    searchVehicles();
    searchAccountInfo();
  }, []);

  const onSubmit = (data: FormValues) => {
    setIsLoading(true);
    
    const dataNew: DataNewType = {
      ...data,
      account_id: account_id,
      driver_status: 'NOVO_CADASTRO',
      driver_status_gr: 'NAO_ENVIADO',
      created_by: session?.userdata.user_id,
    };

    console.log("DataNew", dataNew)
    
    // newDriver(dataNew).then((data: ApiReturn<Driver>) => {
    //   if (data.return == 'error') {
    //     setSaveError(data.message || 'Erro. Contate o administrador!');
    //     setIsLoading(false);
    //   } else {
    //     router.push(
    //       `/admin/accounts/${account_id}/drivers/${data.data?.driver_cpf_cnpj}`
    //     );
    //   }
    // });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
    
      <DriverInfo 
        errors={errors}
        register={register}
        setValue={setValue}
        isChecked={isChecked}
        checkBoxRef={checkBoxRef}
        handleCheck={handleCheck}
        saveError={saveError}
      />

      <DriverAddress 
        register={register}
        errors={errors}
        setValue={setValue}
        handleCheckAddress={handleCheckAddress}
        checkBoxAddressRef={checkBoxAddressRef}
        isCheckedAddress={isCheckedAddress}
      />
          
      <div className="border rounded-md p-4 mt-4">
        <div className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-4">
          <div className="mb-2 sm:col-span-6">
            <h2 className="font-semibold text-gray-800 text-lg underline-offset-8 underline">
              Vínculo com Motorista
            </h2>
          </div>
          <div className="sm:col-span-4">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Relacionar motorista com veículo (opcional)
              </label>
              <div className="mt-1">
                <select
                  {...register('license_plate')}
                  className="block bg-white w-full text-sm p-2 border rounded-md focus:outline-0 text-rede-gray-300 placeholder:text-rede-gray-500 placeholder:text-sm"
                  name="license_plate"
                  id="license_plate"
                >
                  <>
                    {isEmpty ? (
                      <option value={''}>
                        -- Nenhum veículo cadastrado nesta conta --
                      </option>
                    ) : (
                      <option value={''}>-- Selecione a placa --</option>
                    )}

                    {vehicles ? (
                      vehicles.map((vehicle: RdVehicles) => (
                        <option
                          value={vehicle.rd_vehicles.license_plate}
                          key={vehicle.rd_vehicles.vehicle_id}
                        >
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
    
    </form>
  );
}
