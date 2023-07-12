'use client';
import InputMask from 'react-input-mask';
import { useState } from 'react';

type DataType = {
  register: any;
  name: string;
  errors: any;
  setValue: any;
  labelTitle: string;
  isChecked?: boolean | null;
  value?: string | null;
};

export default function DateMaskedInput({
  register,
  name,
  errors,
  labelTitle,
  setValue,
  value,
}: DataType) {
  const [mask, setMask] = useState('99/99/9999');

  return (
    <>
      <label className="block text-sm font-medium leading-6 text-gray-900">
        {labelTitle}
      </label>
      <div className="mt-1">
        <InputMask
          {...register(name)}
          name={name}
          id={name}
          mask={mask}
          maskChar=""
          type="text"
          placeholder="00/00/0000"
          defaultValue={value}
          className={`block w-full text-sm p-2 border rounded-md focus:outline-0 text-rede-gray-300 placeholder:text-rede-gray-500 placeholder:text-sm bg-white`}
        />
        {errors[name] && (
          <p className=" text-red-700 text-xs mt-1">{errors[name].message}</p>
        )}
      </div>
    </>
  );
}
