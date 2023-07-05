'use client';

import InputMask from 'react-input-mask';

import { useState } from 'react';
import { Vehicle } from 'VehiclesTypes';

type DataType = {
  register: any;
  errors: any;
  name: string;
  existing_vehicle?: Vehicle;
};

export default function RenavamMaskedInput({
  register,
  errors,
  name,
  existing_vehicle,
}: DataType) {
  const defaultValue = existing_vehicle ? existing_vehicle : ({} as Vehicle);

  return (
    <>
      <label className="block text-sm font-medium leading-6 text-gray-900">
        Número Renavam
      </label>
      <div className="mt-1">
        <InputMask
          {...register('vehicle_renavam')}
          readOnly={defaultValue?.vehicle_renavam ? true : false}
          name={name}
          id={name}
          mask={'999.999.999-9'}
          maskChar={''}
          defaultValue={defaultValue?.vehicle_renavam}
          placeholder="000.000.000-0"
          className={`block w-full text-sm p-2 border rounded-md focus:outline-0 text-rede-gray-300 placeholder:text-rede-gray-500 placeholder:text-sm bg-white`}
        />
        {errors[name] && (
          <p className=" text-red-700 text-xs mt-1">{errors[name].message}</p>
        )}
      </div>
    </>
  );
}
