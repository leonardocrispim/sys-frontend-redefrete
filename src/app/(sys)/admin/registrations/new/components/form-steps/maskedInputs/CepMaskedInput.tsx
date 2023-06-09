'use client';
import InputMask from 'react-input-mask';
import { useState, ChangeEvent } from 'react';
import cep from 'cep-promise';

type DataType = {
  register: any;
  name: string;
  errors: any;
  setValue: any;
  isLoading?: boolean;
  setIsLoading?: any;
};

export default function CepMaskedInput({
  register,
  name,
  errors,
  setValue,
  isLoading,
  setIsLoading,
}: DataType) {
  const [mask, setMask] = useState('99999-999');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value;
    setValue(name, text);

    if (text.length >= 9) {
      setIsLoading(true);
      cep(text).then((data) => {
        setValue('address_street', data.street);
        setValue('address_number', '');
        setValue('address_district', data.neighborhood);
        setValue('address_city', data.city);
        setValue('address_state', data.state);
        setIsLoading(false);
      });
    }
  };

  return (
    <>
      <label className="block text-sm font-medium leading-6 text-gray-900">
        CEP<sup className="text-red-700">*</sup>
      </label>

      <div className="mt-1">
        <InputMask
          {...register(name, {
            required: 'CEP é obrigatório',
            maxLength: {
              value: 9,
              message: 'CEP inválido',
            },
            minLength: {
              value: 9,
              message: 'CEP inválido',
            },
          })}
          readOnly={isLoading}
          name={name}
          id={name}
          mask={mask}
          onChange={handleChange}
          maskChar=""
          placeholder="00000-000"
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
