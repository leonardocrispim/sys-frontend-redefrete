'use client';
import InputMask from 'react-input-mask';
import { useState, ChangeEvent } from 'react';
import { isValidCpfCnpj } from '@/lib/utils/utils';

type DataType = {
  register: any;
  name: string;
  errors: any;
  setValue: any;
};

export default function CpfMaskedInput({
  register,
  name,
  errors,
  setValue,
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
          {...register(name, {
            required: 'CPF/CNPJ é obrigatório',
            validate: (value: string) => {
              if (isValidCpfCnpj(value)) {
                return true;
              } else {
                return 'Insira um CPF/CNPJ válido';
              }
            },
          })}
          name={name}
          id={name}
          mask={mask}
          
          onChange={handleChange}
          onBlur={handleBlur}
          maskChar=""
          placeholder="000.000.000-00"
          type="text"
          className="block bg-white w-full text-sm p-2 border rounded-md focus:outline-0 text-rede-gray-300 placeholder:text-rede-gray-500 placeholder:text-sm"
        />
        {errors[name] && (
          <p className=" text-red-700 text-xs mt-1">{errors[name].message}</p>
        )}
      </div>
    </>
  );
}
