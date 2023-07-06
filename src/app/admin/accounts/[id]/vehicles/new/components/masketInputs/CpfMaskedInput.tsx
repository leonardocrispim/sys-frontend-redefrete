'use client';
import InputMask from 'react-input-mask';
import { useState, ChangeEvent } from 'react';
import { isValidCpfCnpj } from '@/lib/utils/utils';

type DataType = {
  register: any;
  name: string;
  errors: any;
  setValue: any;
  isChecked?: boolean | null
};

export default function CpfMaskedInput({
  register,
  name,
  errors,
  setValue,
  isChecked
}: DataType) {
  const [mask, setMask] = useState('999.999.999-999');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value;
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
          {...register('vehicle_owner_cpf_cnpj', {
            validate: (value: string) => {
              if(value.length == 0 || value.length == 14 || value.length == 18) {
                return true
              } else if(isValidCpfCnpj(value)) {
                return true
              } else {
                return 'Insira um CPF/CNPJ válido';
              }
            }
          })}
          name={name}
          id={name}
          mask={mask}
          onChange={handleChange}
          onBlur={handleBlur}
          maskChar=""
          placeholder="000.000.000-00"
          type="text"
          readOnly={isChecked}
          className={`block w-full text-sm p-2 border rounded-md focus:outline-0 text-rede-gray-300 placeholder:text-rede-gray-500 placeholder:text-sm ${isChecked ? ` bg-rede-gray-600` : `bg-white`}`} 
        />
        {errors[name] && (
          <p className=" text-red-700 text-xs mt-1">{errors[name].message}</p>
        )}
      </div>
    </>
  );
}
