'use client';

import InputMask from 'react-input-mask';
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
          className="w-full bg-white py-2 pl-3 pr-10 cursor-pointer text-sm leading-5 rounded-md text-rede-gray-300 border focus:outline-none border-rede-gray-400 focus:border-rede-blue/50"
        />
        {errors[name] && (
          <p className=" text-red-700 text-xs mt-1">{errors[name].message}</p>
        )}
      </div>
    </>
  );
}
