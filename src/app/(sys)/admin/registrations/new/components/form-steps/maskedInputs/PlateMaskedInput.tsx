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

export default function PlateMaskedInput({
  register,
  name,
  errors,
  setValue,
  isLoading,
  setIsLoading,
}: DataType) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value.toUpperCase();
    event.target.value = text;
    setValue(name, text);
  };

  return (
    <>
      <label className="block text-sm font-medium leading-6 text-gray-900">
        Placa<sup className="text-red-700">*</sup>
      </label>

      <div className="mt-1">
        <InputMask
          {...register(name, {
            required: 'Placa é obrigatório',
            maxLength: {
              value: 8,
              message: 'Placa inválida',
            },
            minLength: {
              value: 8,
              message: 'Placa inválida',
            },
          })}
          readOnly={isLoading}
          name={name}
          id={name}
          mask="aaa-9*99"
          onChange={handleChange}
          maskChar=""
          placeholder="AAA-0000"
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
