'use client';
import InputMask from 'react-input-mask';
import { useState, ChangeEvent } from 'react';

type DataType = {
  register: any;
  name: string;
  errors: any;
  setValue: any;
  title: string;
  isChecked?: boolean | null;
  value?: string | null;
};

export default function TelephoneMaskedInput({
  register,
  name,
  errors,
  setValue,
  title,
  isChecked,
  value,
}: DataType) {
  const [mask, setMask] = useState('(99) 9999-99999');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value;
    setValue(name, text);
    if (text.length == 15) {
      setMask('(99) 99999-9999');
    } else {
      setMask('(99) 9999-99999');
    }
  };

  return (
    <>
      <label className="block text-sm font-medium leading-6 text-gray-900">
        {title}
      </label>

      <div className="mt-1">
        <InputMask
          {...register(name, {
            validate: (value: string) => {
              if (isChecked == true) {
                return true;
              } else if (value.length > 0 && value.length < 14) {
                return 'Insira um número válido';
              }
              return true;
            },
          })}
          name={name}
          id={name}
          mask={mask}
          onChange={handleChange}
          maskChar=""
          placeholder="(00) 00000-0000"
          type="text"
          readOnly={isChecked}
          defaultValue={value}
          className={`block w-full text-sm p-2 border rounded-md focus:outline-0 text-rede-gray-300 placeholder:text-rede-gray-500 placeholder:text-sm ${
            isChecked ? ` bg-rede-gray-600` : `bg-white`
          }`}
        />
        {errors[name] && (
          <p className=" text-red-700 text-xs mt-1">{errors[name].message}</p>
        )}
      </div>
    </>
  );
}
