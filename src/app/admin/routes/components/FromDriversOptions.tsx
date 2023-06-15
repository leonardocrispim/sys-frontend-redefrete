'use client';

import { Driver } from 'DriversTypes';
import { Vehicle } from 'VehiclesTypes';

import { Fragment, useState, useEffect } from 'react';
import { Combobox, Transition } from '@headlessui/react';
import { BsChevronCompactDown } from 'react-icons/bs';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import React from 'react';
import InputMask from 'react-input-mask';

import { getDriversByPlate } from '@lib/drivers/getDrivers';

import DriverItemList from './DriverItemList';

const DriverNull = {
  driver_id: null,
  driver_name: 'Selecione um motorista',
  driver_cpf_cnpj: '',
  driver_photo: '',
  driver_telephone: '',
};

export default function FromDriversOptions({
  setCurrentDriver,
  currentDriver,
  setCurrentVehicle,
  currentVehicle,
}: any) {
  const [selectedDriver, setSelectedDriver] = useState(
    currentDriver || DriverNull
  );
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [query, setQuery] = useState('');
  const [searchLoading, setSearchLoading] = useState(false);
  const [hasResult, setHasResult] = useState(false);

  const [filtredDrivers, setFiltredDrivers] = useState<Driver[] | any[]>([
    DriverNull,
  ]);

  function driversSearch() {
    setSearchLoading(true);
    setHasResult(false);
    setSelectedDriver(DriverNull);

    getDriversByPlate(query.replace('-', ''))
      .then((plateDrivers: any) => {
        if (plateDrivers && plateDrivers?.rd_vin_drivers_vehicles.length > 0) {
          const { rd_vin_drivers_vehicles, ...vehicle } = plateDrivers;
          const driversList: Driver[] = rd_vin_drivers_vehicles.map(
            (link: any) => link.rd_drivers
          );

          setFiltredDrivers(driversList);

          setSelectedVehicle(vehicle);

          if (driversList.length == 1) {
            setSelectedDriver(driversList[0]);
          } else {
            setHasResult(true);
          }
        }
      })
      .finally(() => {
        setSearchLoading(false);
      });
  }

  useEffect(
    function () {
      if (selectedDriver.driver_id) {
        setCurrentDriver(selectedDriver);
        setCurrentVehicle(selectedVehicle);
      } else {
        setCurrentVehicle(null);

        setCurrentDriver(DriverNull);
      }
    },
    [selectedDriver]
  );

  return (
    <div className="w-full">
      <div className="text-sm text-rede-gray-300 font-semibold">
        Busque pela placa
      </div>
      <div className="mb-8">
        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-3">
            <InputMask
              mask="aaa-9*99"
              maskChar=""
              placeholder="AAA-0X00"
              type="text"
              value={query}
              onChange={(event: any) =>
                setQuery(event.target.value.toUpperCase())
              }
              className="w-full bg-white py-2 pl-3 pr-10 text-sm leading-5 rounded-md text-rede-gray-300 border focus:outline-none border-rede-gray-400 focus:border-rede-blue/50 "
            />
          </div>
          <div className="col-span-1">
            <button
              type="button"
              onClick={driversSearch}
              className="inline-flex w-full justify-center rounded-md border border-transparent bg-rede-blue-700 px-4 py-2 text-sm font-medium text-rede-blue-100 hover:bg-rede-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              <span>BUSCAR</span>
            </button>
          </div>
        </div>
        {searchLoading && (
          <p className="inline-flex mt-2 justify-center rounded-md border border-transparent bg-rede-gray-700/80 px-4 py-2 text-sm font-medium text-gray-red-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
            <AiOutlineLoading3Quarters className="-ml-1 animate-spin mr-2 h-5 w-5 text-gray-green-100" />{' '}
            CARREGANDO...
          </p>
        )}
      </div>

      <Transition
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        show={hasResult}
      >
        <div className="text-xs mb-2 text-rede-gray-300 font-normal">
          <div>
            Placa: <strong>{selectedVehicle?.license_plate}</strong>
          </div>
          <div>
            Tipo: <strong>{selectedVehicle?.vehicle_type}</strong>
          </div>
        </div>

        <div className="text-sm text-rede-gray-300 font-semibold">
          Selecione um motorista para atribuir esta rota.
        </div>
        <Combobox value={selectedDriver} onChange={setSelectedDriver}>
          <div className="relative mt-1">
            <div className="relative w-full cursor-pointer overflow-hidden  bg-white text-left  ">
              <Combobox.Input
                className="w-full bg-white py-2 pl-3 pr-10 text-sm leading-5 rounded-md text-rede-gray-300 border focus:outline-none border-rede-gray-400 focus:border-rede-blue/50 "
                value={selectedDriver.driver_name}
                type="text"
                readOnly={true}
              />
              <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                <BsChevronCompactDown
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </Combobox.Button>
            </div>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base ring-1 ring-rede-gray-400">
                {!filtredDrivers || filtredDrivers.length === 0 ? (
                  <div className="relative cursor-default select-none py-2 px-4 text-rede-gray-300">
                    Nenhum motorista listado
                  </div>
                ) : (
                  filtredDrivers.map((driver: Driver | any) => (
                    <Combobox.Option
                      key={driver.driver_id}
                      className={({ active }) =>
                        `relative cursor-pointer select-none text-rede-gray-300 text-sm ${
                          active ? 'bg-rede-gray-700' : 'bg-white'
                        }`
                      }
                      value={driver}
                    >
                      <span
                        className={`block  truncate py-2 px-4 ${
                          selectedDriver?.driver_id == driver.driver_id
                            ? ' bg-rede-blue-800'
                            : ''
                        }`}
                      >
                        <DriverItemList driver={driver} />
                      </span>
                    </Combobox.Option>
                  ))
                )}
              </Combobox.Options>
            </Transition>
          </div>
        </Combobox>
      </Transition>
    </div>
  );
}
