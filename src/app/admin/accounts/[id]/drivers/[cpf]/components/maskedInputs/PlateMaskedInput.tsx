'use client';

import FeedbackError from '@/components/utils/feedbacks/FeedbackError';
import { getVehicle } from '@/lib/vehicles/getVehicles';
import { DriverVinVehicles } from 'DriversTypes';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import InputMask from 'react-input-mask';
import { Vehicle } from 'VehiclesTypes';

type DataType = {
  setHasVehicleType: Dispatch<SetStateAction<boolean>>;
  setVehicleType: Dispatch<SetStateAction<string>>;
  setIsCastrated: Dispatch<SetStateAction<boolean | null>>;
  register: any;
  setValue: any;
  name: string;
  vehicles: DriverVinVehicles[] | undefined;
};

export default function PlateMaskedInput({
  setHasVehicleType,
  setVehicleType,
  setIsCastrated,
  register,
  setValue,
  name,
  vehicles,
}: DataType) {
  const [plate, setPlate] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const license_plates = vehicles?.map((vehicle: DriverVinVehicles) => {
    return vehicle.rd_vehicles.license_plate;
  });

  useEffect(
    function () {
      setValue(name, plate);
      setHasVehicleType(false);
      setVehicleType('');
      setIsCastrated(null);

      if (plate.length >= 8) {
        setIsLoading(true);

        getVehicle(plate)
          .then((vehicle: Vehicle | null) => {
            if (vehicle) {
              setIsCastrated(true);
            } else {
              setHasVehicleType(true);
              setIsCastrated(false);
            }
          })
          .finally(() => {
            setIsLoading(false);
          });
      }
    },
    [plate]
  );

  return (
    <>
      <InputMask
        {...register(name, {
          validate: (value: string) => {
            if (value.length < 8) {
              return 'Placa inválida';
            }

            if (license_plates?.includes(plate.replace('-', '').trim())) {
              return 'Placa já cadastrada para este motorista';
            }

            return true;
          },
        })}
        name={name}
        id={name}
        mask="aaa-9*99"
        maskChar=""
        disabled={isLoading}
        placeholder="AAA-0X00"
        type="text"
        value={plate}
        onChange={(event: any) => setPlate(event.target.value.toUpperCase())}
        className="w-full bg-white py-2 pl-3 pr-10 text-sm leading-5 rounded-md text-rede-gray-300 border focus:outline-none border-rede-gray-400 focus:border-rede-blue/50 "
      />
      {isLoading && (
        <p className="p-1 rounded-md border text-xl flex items-center text-rede-gray-400 bg-rede-gray-800 border-rede-gray-700">
          <AiOutlineLoading3Quarters className="mr-1 animate-spin h-4 w-4 text-rede-gray-400" />{' '}
          Carregando...
        </p>
      )}
    </>
  );
}
