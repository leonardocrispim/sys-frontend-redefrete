'use client';
import PageTitle from '@/components/utils/PageTitle';
import { useEffect, useState } from 'react';
import ModalDrivers from './ModalDrivers';
import { Vehicle } from 'VehiclesTypes';
import { Driver, Vin_drivers } from 'DriversTypes';
import DriverMap from './DriverMap';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { BsFillPersonPlusFill } from 'react-icons/bs';
import { getDrivers } from '@/lib/drivers/getDrivers';
import { ApiReturn } from 'UtilsTypes';

type DataType = {
  drivers: any;
  vehicle: Vehicle;
  vehicleOk: boolean;
  account_id: number;
};

export default function DriversData({
  drivers,
  vehicle,
  vehicleOk,
  account_id,
}: DataType) {
  const [accountDrivers, setAccountDrivers] = useState<
    Driver[] | undefined | null
  >(null);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [driversData, setDriversData] = useState(drivers);

  drivers = driversData;

  async function searchAccountDrivers() {
    setAccountDrivers(null);
    setIsLoading(true);

    getDrivers({ account_id: account_id })
      .then((data: ApiReturn<Driver[]>) => {
        setAccountDrivers(data.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log('erro na busca de motoristas');
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    searchAccountDrivers();
  }, []);

  useEffect(() => {
    drivers = driversData;
  }, [driversData]);

  return (
    <>
      <div className="mb-5">
        <PageTitle>Motorista(s)</PageTitle>
      </div>

      {driversData &&
        driversData.map((driver: Vin_drivers) => {
          console.log('DRIVER', driver);
          return (
            <DriverMap
              key={driver.driver_id}
              vehicleOk={vehicleOk}
              driver={driver}
              vehicle={vehicle}
              account_id={account_id}
              accountDrivers={accountDrivers}
            />
          );
        })}

      {drivers && drivers.length == 0 && (
        <div className="border rounded-md p-4 mb-2">
          <div className="text-rede-red-400 text-lg">
            Não há motoristas vinculados a este veículo
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
            <BsFillPersonPlusFill className=" -ml-1 mr-2 h-5 w-5 text-white dark:text-slate-900" />
          )}
          <span>ADICIONAR MOTORISTA</span>
        </button>

        <ModalDrivers
          isOpenModal={isOpenModal}
          setIsOpenModal={setIsOpenModal}
          vehicleId={vehicle.vehicle_id}
          account_id={account_id}
          driversData={driversData}
          accountDrivers={accountDrivers}
          setDriversData={setDriversData}
        />
      </div>
    </>
  );
}
