'use client';
import InputMask from 'react-input-mask';
import {
  useState,
  ChangeEvent,
  useEffect,
  Dispatch,
  SetStateAction,
} from 'react';
import { isValidCpfCnpj, removeEspecialChars } from '@/lib/utils/utils';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { getVehicle } from '@/lib/vehicles/getVehicles';
import { getDriver } from '@/lib/drivers/getDrivers';
import { Driver } from 'DriversTypes';

type DataType = {
  register: any;
  name: string;
  errors: any;
  setValue: any;
  drivers?: any;
  accountDrivers: Driver[] | undefined | null;
  isChecked?: boolean | null;
  driverAlreadyVinculated: boolean;
  setDriverAlreadyVinculated: Dispatch<SetStateAction<boolean>>;
  showInputs: boolean;
  setShowInputs: Dispatch<SetStateAction<boolean>>;
  setDriverExistOnAccount: Dispatch<SetStateAction<boolean>>;
  setNewDriver: Dispatch<SetStateAction<boolean>>;
};

export default function CpfMaskedInput({
  register,
  name,
  errors,
  setValue,
  drivers,
  accountDrivers,
  isChecked,
  driverAlreadyVinculated,
  setDriverAlreadyVinculated,
  showInputs,
  setShowInputs,
  setDriverExistOnAccount,
  setNewDriver,
}: DataType) {
  const [mask, setMask] = useState('999.999.999-999');
  const [cpf, setCpf] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const vinculatedDriversCpf = drivers.map((driver: any) => {
    return driver.rd_drivers.driver_cpf_cnpj;
  });

  useEffect(
    function () {
      setValue('driver_cpf_cnpj', cpf);

      if (cpf.length < 14) {
        setShowInputs(false);
        setDriverAlreadyVinculated(false);
        setDriverExistOnAccount(false);
        setNewDriver(false);
        setValue('driver_name', '');
        setValue('driver_telephone', '');
        setValue('driver_email', '');
      }

      if (cpf.length >= 14) {
        setIsLoading(true);

        const driverExist = accountDrivers?.filter(
          (driver: Driver | null | undefined) => {
            if (driver?.driver_cpf_cnpj == removeEspecialChars(cpf)) {
              return driver;
            }
          }
        );

        if (vinculatedDriversCpf.includes(removeEspecialChars(cpf))) {
          setDriverAlreadyVinculated(true);
          setIsLoading(false);
        } else if (driverExist?.length) {
          setDriverExistOnAccount(true);
          setValue('driver_name', driverExist[0].driver_name);
          setValue('driver_telephone', driverExist[0].driver_telephone);
          setValue('driver_email', driverExist[0].driver_email);
          setShowInputs(true);
          setIsLoading(false);
        } else {
          setNewDriver(true);
          setShowInputs(true);
          setIsLoading(false);
        }
      }
    },
    [cpf]
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value;
    setCpf(text);
    setValue(name, text);

    if (text.length >= 15) {
      setMask('99.999.999/9999-99');
    } else {
      setMask('999.999.999-999');
    }
  };
  const handleBlur = (event: ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value;
    if (text.length != 14 && text.length != 18) {
      event.target.value = '';
    }
  };

  return (
    <>
      <label className="block text-sm font-medium leading-6 text-gray-900">
        CPF/CNPJ<sup className="text-red-700">*</sup>
      </label>

      <div className="mt-1">
        <InputMask
          {...register('driver_cpf_cnpj', {
            validate: (value: string) => {
              if (
                value.length == 0 ||
                value.length == 14 ||
                value.length == 18
              ) {
                return true;
              } else if (isValidCpfCnpj(value)) {
                return true;
              } else {
                return 'Insira um CPF/CNPJ válido';
              }
            },
          })}
          name={'driver_cpf_cnpj'}
          id={'driver_cpf_cnpj'}
          mask={mask}
          onChange={handleChange}
          onBlur={handleBlur}
          maskChar=""
          placeholder="000.000.000-00"
          value={cpf}
          event={(event: any) => setCpf(event.target.value)}
          type="text"
          readOnly={isChecked}
          className={`block w-full text-sm p-2 border rounded-md focus:outline-0 text-rede-gray-300 placeholder:text-rede-gray-500 placeholder:text-sm ${
            isChecked ? ` bg-rede-gray-600` : `bg-white`
          }`}
        />
        {errors[name] && (
          <p className=" text-red-700 text-xs mt-1">{errors[name].message}</p>
        )}
      </div>

      {isLoading && (
        <p className="p-1 rounded-md border text-xl flex items-center text-rede-gray-400 bg-rede-gray-800 border-rede-gray-700">
          <AiOutlineLoading3Quarters className="mr-1 animate-spin h-4 w-4 text-rede-gray-400" />{' '}
          Carregando...
        </p>
      )}
    </>
  );
}
