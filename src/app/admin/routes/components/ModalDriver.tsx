'use client';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState, useEffect } from 'react';

import {
  AiOutlineCheckSquare,
  AiOutlineCloseSquare,
  AiOutlineLoading3Quarters,
} from 'react-icons/ai';

import { Route } from 'RoutesTypes';
import FromDriversOptions from './FromDriversOptions';

import { formatDateBR } from '@utils/utils';

import { editRoute } from '@lib/routes/alterRoutes';

import DriverItemList from './DriverItemList';
import { Driver } from 'DriversTypes';
import { Vehicle } from 'VehiclesTypes';

type DataProps = {
  isOpenModalDriver: boolean;
  setIsOpenModalDriver: (isOpenModalDriver: boolean) => void;
  setThisDriver: (thisDriver: Driver | undefined) => void;
  thisDriver: Driver | undefined;
  route: Route;
};

export default function ModalDriver({
  isOpenModalDriver,
  setIsOpenModalDriver,
  setThisDriver,
  thisDriver,
  route,
}: DataProps) {
  const [currentDriver, setCurrentDriver] = useState<Driver | undefined>(
    route?.rd_drivers
  );

  const [currentVehicle, setCurrentVehicle] = useState<Vehicle | undefined>(
    route?.rd_vehicles
  );

  const [isDriverLoading, setIsDriverLoading] = useState(false);
  const [isDriverError, setIsDriverError] = useState<string | null>(null);

  function closeModal() {
    setIsOpenModalDriver(false);
    setCurrentDriver(thisDriver);
  }

  useEffect(() => {}, [currentDriver]);

  function saveDriver() {
    setIsDriverLoading(true);
    setIsDriverError(null);
    const dataRoute = route;
    dataRoute.driver_id = currentDriver?.driver_id;
    dataRoute.vehicle_id = currentVehicle?.vehicle_id;

    if (!currentDriver?.driver_id) {
      setIsDriverError('Busque uma placa e escolha um motorista');
      setIsDriverLoading(false);
      return;
    }

    editRoute(dataRoute)
      .then((data) => {
        if (data.return == 'error') {
          setIsDriverError(data.message);
        } else {
          setThisDriver(currentDriver);
          setCurrentDriver(currentDriver);
          setCurrentVehicle(currentVehicle);
          setIsOpenModalDriver(false);
        }
      })
      .finally(() => {
        setIsDriverLoading(false);
      });
  }

  return (
    <>
      <Transition appear show={isOpenModalDriver} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => {}}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full py-6 max-w-md transform rounded-md bg-white text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-rede-gray-300 px-6"
                  >
                    #{route.route_code}
                    <div className=" text-xs text-gray-500">
                      {route?.freight_date &&
                        'Carregado em: ' + formatDateBR(route.freight_date)}
                    </div>
                  </Dialog.Title>
                  <div className="px-6 mt-6">
                    <div className="mt-2">
                      <FromDriversOptions
                        setCurrentDriver={setCurrentDriver}
                        currentDriver={currentDriver}
                        setCurrentVehicle={setCurrentVehicle}
                        currentVehicle={currentVehicle}
                      />
                    </div>
                    {currentDriver?.driver_id && (
                      <div className="mt-2 p-2 border border-rede-blue-600 bg-rede-blue-900 rounded-md">
                        <DriverItemList driver={currentDriver} />
                      </div>
                    )}
                    {isDriverError && (
                      <p className="text-rede-red-300 text-sm">
                        {isDriverError}
                      </p>
                    )}
                  </div>

                  <div className="mt-20 border-t-2 px-6 pt-6 flex justify-between">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-rede-green-700 px-4 py-2 text-sm font-medium text-rede-green-100 hover:bg-rede-green-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={saveDriver}
                      disabled={isDriverLoading}
                    >
                      {!isDriverLoading ? (
                        <AiOutlineCheckSquare className="-ml-1 mr-2 h-5 w-5 text-rede-green-100" />
                      ) : (
                        <AiOutlineLoading3Quarters className="-ml-1 animate-spin mr-2 h-5 w-5 text-rede-green-100" />
                      )}

                      <span>SALVAR</span>
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-rede-red-800 px-4 py-2 text-sm font-medium text-rede-red-100 hover:bg-rede-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      <AiOutlineCloseSquare className="-ml-1 mr-2 h-5 w-5 text-rede-red-100" />
                      <span>CANCELAR</span>
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
