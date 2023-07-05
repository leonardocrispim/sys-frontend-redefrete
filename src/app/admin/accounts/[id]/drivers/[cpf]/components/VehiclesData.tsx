'use client';
import PageTitle from '@/components/utils/PageTitle';
import { formatPlate } from '@/lib/utils/utils';
import { DriverVinVehicles } from 'DriversTypes';
import { useState } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { FaCar } from 'react-icons/fa';
import ModalVehicles from './ModalVehicles';

type DataType = {
  driverVehicles: DriverVinVehicles[] | undefined;
  driverId: number;
  account_id: number;
};

export default function VehiclesData({
  driverVehicles,
  driverId,
  account_id,
}: DataType) {
  const [vehicles, setVehicles] = useState(driverVehicles);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const isLoading = false;

  return (
    <>
      <div className="mb-5">
        <PageTitle>Veículos(s)</PageTitle>
      </div>

      {vehicles &&
        vehicles.map((vehicle: DriverVinVehicles) => {
          return (
            <div
              key={`vehicle-${vehicle.rd_vehicles.license_plate}`}
              className="border rounded-md p-4 mb-2"
            >
              <div className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-6">
                <div className="sm:col-span-2">
                  <div className="text-xs font-medium text-rede-gray-400">
                    Placa
                  </div>
                  <div className="text-lg font-medium  text-rede-gray-200">
                    {formatPlate(vehicle.rd_vehicles.license_plate)}
                  </div>
                </div>
                <div>
                  <div className="text-xs font-medium text-rede-gray-400">
                    Tipo
                  </div>
                  <div className="text-lg font-medium  text-rede-gray-200">
                    {vehicle.rd_vehicles.vehicle_type}
                  </div>
                </div>
              </div>
            </div>
          );
        })}

      {vehicles && vehicles?.length == 0 && (
        <div className="border rounded-md p-4 mb-2">
          <div className="text-rede-red-400 text-lg">
            Não há veículos vinculados a este motorista
          </div>
        </div>
      )}

      <div className="flex justify-end">
        <button
          type="button"
          disabled={isLoading}
          onClick={() => setIsOpenModal(true)}
          className={
            `inline-flex justify-center rounded-lg text-sm font-semibold py-2 px-4 text-white hover:bg-rede-blue-400 dark:bg-gray-200 dark:hover:bg-white dark:text-slate-900 ` +
            (isLoading ? ' bg-rede-gray-400' : ' bg-rede-blue')
          }
        >
          {isLoading ? (
            <AiOutlineLoading3Quarters className=" -ml-1 mr-2 h-5 w-5 text-white dark:text-slate-900 animate-spin " />
          ) : (
            <FaCar className=" -ml-1 mr-2 h-5 w-5 text-white dark:text-slate-900" />
          )}
          <span>ADICIONAR VEÍCULO</span>
        </button>

        <ModalVehicles
          setIsOpenModal={setIsOpenModal}
          isOpenModal={isOpenModal}
          driverId={driverId}
          vehicles={vehicles}
          setVehicles={setVehicles}
          account_id={account_id}
        />
      </div>
    </>
  );
}
