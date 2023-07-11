'use client';
import { Dialog, Transition } from '@headlessui/react';
import { Dispatch, Fragment, SetStateAction, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  AiOutlineCheckSquare,
  AiOutlineCloseSquare,
  AiOutlineLoading3Quarters,
} from 'react-icons/ai';
import CpfMaskedInput from '../maskedInputs/CpfMaskedInput';
import { Driver } from 'DriversTypes';
import FeedbackInfo from '@/components/utils/feedbacks/FeedbackInfo';
import FeedbackError from '@/components/utils/feedbacks/FeedbackError';
import FeedbackSuccess from '@/components/utils/feedbacks/FeedbackSuccess';
import TelephoneMaskedInput from '../maskedInputs/TelephoneMaskedInput';
import { vinVehicleDriver } from '@/lib/vehicles/vinVehicle';

type FormValues = {
  driver_cpf_cnpj: string;
  driver_name: string;
  driver_telephone: string;
  driver_email: string;
};

type DataType = {
  isOpenModal: boolean;
  setIsOpenModal: Dispatch<SetStateAction<boolean>>;
  vehicleId: number | undefined;
  account_id: number;
  accountDrivers: Driver[] | undefined | null;
  driversData: any;
  setDriversData: Dispatch<SetStateAction<any>>;
};

export default function ModalDrivers({
  isOpenModal,
  setIsOpenModal,
  vehicleId,
  account_id,
  accountDrivers,
  driversData,
  setDriversData,
}: DataType) {
  const [isLoading, setIsLoading] = useState(false);
  const [driverAlreadyVinculated, setDriverAlreadyVinculated] =
    useState<boolean>(false);
  const [showInputs, setShowInputs] = useState<boolean>(false);
  const [driverExistOnAccount, setDriverExistOnAccount] =
    useState<boolean>(false);
  const [newDriver, setNewDriver] = useState<boolean>(false);

  function closeModal() {
    setIsOpenModal(false);
  }

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>();

  const TEL = watch('driver_telephone');
  const NAME = watch('driver_name');
  const EMAIL = watch('driver_email');
  const CPF = watch('driver_cpf_cnpj');

  async function onSubmit() {
    setIsLoading(true);
    console.log('ENTROOOU');
    console.log('SUBMIT', TEL, NAME, EMAIL, CPF);

    vinVehicleDriver({
      vehicle_id: vehicleId,
      driver: {
        account_id: account_id,
        driver_cpf_cnpj: CPF,
        driver_name: NAME,
        driver_email: EMAIL,
        driver_telephone: TEL,
      },
    })
      .then((data) => {
        if (driversData) {
          setDriversData([...driversData, data.data]);
        } else {
          setDriversData([data.data]);
        }
      })
      .finally(() => {
        setIsLoading(false);
        closeModal();
      });
  }

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
                    VÍNCULO DE VEÍCULO COM MOTORISTA
                  </Dialog.Title>
                  <form>
                    <div className="px-6 mt-6">
                      <div className="mt-2">
                        <div className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-4">
                          <div className="sm:col-span-2">
                            <CpfMaskedInput
                              register={register}
                              name={'driver_cpf_cnpj'}
                              setValue={setValue}
                              errors={errors}
                              drivers={driversData}
                              accountDrivers={accountDrivers}
                              driverAlreadyVinculated={driverAlreadyVinculated}
                              setDriverAlreadyVinculated={
                                setDriverAlreadyVinculated
                              }
                              showInputs={showInputs}
                              setShowInputs={setShowInputs}
                              setDriverExistOnAccount={setDriverExistOnAccount}
                              setNewDriver={setNewDriver}
                            />
                            {errors?.driver_cpf_cnpj && (
                              <p className="font-semibold text-red-700 text-xs mt-1">
                                {errors.driver_cpf_cnpj.message}
                              </p>
                            )}
                          </div>

                          <div className="sm:col-span-2">
                            <Transition
                              show={showInputs}
                              enter="transition-opacity duration-300"
                              enterFrom="opacity-0"
                              enterTo="opacity-100"
                              leave="transition-opacity duration-300"
                              leaveFrom="opacity-100"
                              leaveTo="opacity-0"
                            >
                              <div>
                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                  Nome<sup className="text-red-700">*</sup>
                                </label>
                                <div className="mt-1">
                                  <input
                                    {...register('driver_name', {
                                      required: 'Nome Obrigatório',
                                      validate: (value: string) => {
                                        if (value.split(' ').length < 2) {
                                          return 'Digite o nome completo';
                                        }
                                        return true;
                                      },
                                    })}
                                    type="text"
                                    name="driver_name"
                                    id="driver_name"
                                    readOnly={driverExistOnAccount}
                                    placeholder="João da Silva"
                                    className="block bg-white w-full text-sm p-2 border rounded-md focus:outline-0 text-rede-gray-300 placeholder:text-rede-gray-500 placeholder:text-sm"
                                  />
                                </div>
                                {errors?.driver_name && (
                                  <p className=" text-red-700 text-xs mt-1">
                                    {errors.driver_name.message}
                                  </p>
                                )}
                              </div>
                            </Transition>
                          </div>

                          <div className="sm:col-span-2">
                            <Transition
                              show={showInputs}
                              enter="transition-opacity duration-300"
                              enterFrom="opacity-0"
                              enterTo="opacity-100"
                              leave="transition-opacity duration-300"
                              leaveFrom="opacity-100"
                              leaveTo="opacity-0"
                            >
                              <div>
                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                  Email<sup className="text-red-700">*</sup>
                                </label>
                                <div className="mt-1">
                                  <input
                                    {...register('driver_email', {
                                      required: 'Nome Obrigatório',
                                      validate: (value: string) => {
                                        if (value.split(' ').length < 2) {
                                          return 'Digite o nome completo';
                                        }
                                        return true;
                                      },
                                    })}
                                    type="text"
                                    name="driver_email"
                                    id="driver_email"
                                    readOnly={driverExistOnAccount}
                                    placeholder="joao@gmail.com"
                                    className="block bg-white w-full text-sm p-2 border rounded-md focus:outline-0 text-rede-gray-300 placeholder:text-rede-gray-500 placeholder:text-sm"
                                  />
                                </div>
                                {errors?.driver_name && (
                                  <p className=" text-red-700 text-xs mt-1">
                                    {errors.driver_name.message}
                                  </p>
                                )}
                              </div>
                            </Transition>
                          </div>

                          <div className="sm:col-span-2">
                            <Transition
                              show={showInputs}
                              enter="transition-opacity duration-300"
                              enterFrom="opacity-0"
                              enterTo="opacity-100"
                              leave="transition-opacity duration-300"
                              leaveFrom="opacity-100"
                              leaveTo="opacity-0"
                            >
                              <div>
                                <TelephoneMaskedInput
                                  register={register}
                                  name="driver_telephone"
                                  errors={errors}
                                  setValue={setValue}
                                  title="Telefone"
                                  value={TEL}
                                  driverExistOnAccount={driverExistOnAccount}
                                />
                              </div>
                            </Transition>
                          </div>
                        </div>

                        <div className="mt-4">
                          {driverAlreadyVinculated && (
                            <FeedbackError text="Motorista já vinculado com esse veículo" />
                          )}

                          {driverExistOnAccount && (
                            <FeedbackSuccess text="Motorista já cadastrado na conta" />
                          )}

                          {newDriver && (
                            <FeedbackInfo text="Preencha os dados do novo motorista" />
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="border-t-2 px-6 pt-6 flex justify-between">
                      <button
                        type="submit"
                        className="inline-flex justify-center rounded-md border border-transparent bg-rede-green-700 px-4 py-2 text-sm font-medium text-rede-green-100 hover:bg-rede-green-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        disabled={isLoading}
                        onClick={() => onSubmit()}
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
