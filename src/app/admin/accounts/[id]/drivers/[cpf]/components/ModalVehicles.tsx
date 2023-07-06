'use client';
import { Dialog, Transition } from '@headlessui/react';
import { Dispatch, Fragment, SetStateAction, useState } from 'react';
import { VehiclesConstants } from '@utils/vehiclesConstants';
import { useForm } from 'react-hook-form';
import {
  AiOutlineCheckSquare,
  AiOutlineCloseSquare,
  AiOutlineLoading3Quarters,
} from 'react-icons/ai';

import PlateMaskedInput from './maskedInputs/PlateMaskedInput';
import FeedbackError from '@/components/utils/feedbacks/FeedbackError';
import FeedbackInfo from '@/components/utils/feedbacks/FeedbackInfo';
import FeedbackSuccess from '@/components/utils/feedbacks/FeedbackSuccess';
import { vinDriverVehicle } from '@/lib/drivers/vinDrivers';
import { Vehicle } from 'VehiclesTypes';
import { DriverVinVehicles } from 'DriversTypes';
import { ApiReturn } from 'UtilsTypes';
import RenavamMaskedInput from './maskedInputs/RenavamMasketInput';

type FormValues = {
  license_plate: string;
  vehicle_type: string;
  vehicle_renavam: string;
};

type DataType = {
  isOpenModal: boolean;
  setIsOpenModal: Dispatch<SetStateAction<boolean>>;
  driverId: number;
  vehicles: DriverVinVehicles[] | undefined;
  setVehicles: Dispatch<SetStateAction<DriverVinVehicles[] | undefined>>;
  account_id: number;
};

export default function ModalVehicles({
  isOpenModal,
  setIsOpenModal,
  driverId,
  vehicles,
  setVehicles,
  account_id
}: DataType) {
  const [isLoading, setIsLoading] = useState(false);
  const [hasVehicleType, setHasVehicleType] = useState(false);
  const [vehicleType, setVehicleType] = useState('');

  const [isCastrated, setIsCastrated] = useState<boolean | null>(null);

  function closeModal() {
    setIsOpenModal(false);
  }

  async function onSubmit(data: FormValues) {
    setIsLoading(true);
    vinDriverVehicle({
      driver_id: driverId,
      license_plate: data.license_plate,
      vehicle_type: data.vehicle_type,
      vehicle_renavam: data.vehicle_renavam,
      account_id: account_id
    })
      .then((data) => {
        if (vehicles) {
          setVehicles([...vehicles, data.data]);
        } else {
          setVehicles([data.data]);
        }
      })
      .finally(() => {
        setIsCastrated(null);

        setVehicleType('');
        setIsLoading(false);
        setHasVehicleType(false);
        closeModal();
      });
  }

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>();

  return (
    <>
      <Transition appear show={isOpenModal} as={Fragment}>
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
                    VÍNCULO DE MOTORISTA E VEÍCULO
                  </Dialog.Title>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="px-6 mt-6">
                      <div className="mt-2">
                        <div className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-4">
                          <div className="sm:col-span-2">
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                              Placa<sup className="text-red-700">*</sup>
                            </label>
                            <div className="mt-1">
                              <PlateMaskedInput
                                vehicles={vehicles}
                                register={register}
                                setValue={setValue}
                                name="license_plate"
                                setIsCastrated={setIsCastrated}
                                setHasVehicleType={setHasVehicleType}
                                setVehicleType={setVehicleType}
                              />
                              {errors?.license_plate && (
                                <p className="font-semibold text-red-700 text-xs mt-1">
                                  {errors.license_plate.message}
                                </p>
                              )}
                            </div>
                            {/* {errors?.driver_name && (
                              <p className=" text-red-700 text-xs mt-1">
                                {errors.driver_name.message}
                              </p>
                            )} */}
                          </div>

                          <div className="sm:col-span-2">
                            <Transition
                              show={hasVehicleType}
                              enter="transition-opacity duration-300"
                              enterFrom="opacity-0"
                              enterTo="opacity-100"
                              leave="transition-opacity duration-300"
                              leaveFrom="opacity-100"
                              leaveTo="opacity-0"
                            >
                              <div>
                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                  Tipo<sup className="text-red-700">*</sup>
                                </label>
                                <div className="mt-1">
                                  <select
                                    {...register('vehicle_type', {
                                      validate: (value: string) => {
                                        if (!isCastrated && value == '') {
                                          return 'Selecione o tipo.';
                                        }
                                        return true;
                                      },
                                    })}
                                    id="vehicle_type"
                                    name="vehicle_type"
                                    className="w-full bg-white py-2 pl-3 pr-10 cursor-pointer text-sm leading-5 rounded-md text-rede-gray-300 border focus:outline-none border-rede-gray-400 focus:border-rede-blue/50"
                                    value={vehicleType}
                                    onChange={(event) =>
                                      setVehicleType(event.target.value)
                                    }
                                  >
                                    <option value="">
                                      -- selecione o tipo --
                                    </option>
                                    {Object.entries(VehiclesConstants).map(
                                      ([key, value]) => {
                                        return (
                                          <option value={key} key={key}>
                                            {value}
                                          </option>
                                        );
                                      }
                                    )}
                                  </select>
                                  {errors?.vehicle_type && (
                                    <p className="font-semibold text-red-700 text-xs mt-1">
                                      {errors.vehicle_type.message}
                                    </p>
                                  )}
                                </div>
                              </div>
                              <div className='mt-2'>
                                <RenavamMaskedInput 
                                  register={register}
                                  errors={errors}
                                  name='vehicle_renavam'
                                />
                              </div>
                            </Transition>
                            {/* {errors?.driver_name && (
                              <p className=" text-red-700 text-xs mt-1">
                                {errors.driver_name.message}
                              </p>
                            )} */}
                          </div>
                        </div>

                        <div className="mt-4">
                          {isCastrated == false && (
                            <FeedbackInfo text="Selecione o tipo para cadastrar este veículo." />
                          )}

                          {isCastrated == true && (
                            <FeedbackSuccess text="Veículo já cadastrado." />
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="border-t-2 px-6 pt-6 flex justify-between">
                      <button
                        type="submit"
                        className="inline-flex justify-center rounded-md border border-transparent bg-rede-green-700 px-4 py-2 text-sm font-medium text-rede-green-100 hover:bg-rede-green-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        disabled={isLoading}
                      >
                        {!isLoading ? (
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
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
