'use client';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import FeedbackError from '@/components/utils/feedbacks/FeedbackError';
import { RdVehicles } from '../../components/ListVehicles';
import { getVehiclesByAccountId } from '@/lib/vehicles/getVehiclesByAccountId';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import PlateMaskedInput from './masketInputs/PlateMaskedInput';

import { getDrivers } from '@/lib/drivers/getDrivers';

import { VehiclesConstants, vehiclesMap } from '@/lib/utils/vehiclesConstants';
import { Driver } from 'DriversTypes';
import { FaRegSave } from 'react-icons/fa';
import { NewVehicle, Vehicle } from 'VehiclesTypes';
import { newVehicle } from '@/lib/vehicles/newVehicles';
import { ApiReturn } from 'UtilsTypes';

type FormValues = {
    license_plate: string;
    vehicle_type: string;
    driver_id: number
}

type PropsType = {
    account_id: number
}

type VehicleType = {
    value: string
    type: string
}

export default function newForm({ account_id }: PropsType) {
    const [saveError, setSaveError] = useState('')

    const [hasVehicleType, setHasVehicleType] = useState(false)
    const [vehicleRegistered, setVehicleRegistered] = useState(false)
    const [vehicleType, setVehicleType] = useState('');
    
    const [isCastrated, setIsCastrated] = useState<boolean | null>(false)

    const [vehicles, setVehicles] = useState<RdVehicles[] | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const [drivers, setDrivers] = useState<Driver[] | null | undefined>(null)
    const [isEmpty, setIsEmpty] = useState<boolean>(false)

    const { data: session, status } = useSession()
    const router = useRouter()

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<FormValues>()

    console.log("watch", watch('driver_id'))

    async function searchVehicles() {
        setVehicles([])
        setIsLoading(true)

        try {
            const data = await getVehiclesByAccountId({
                account_id: account_id
            })

            setVehicles(data)
        
        } catch (error) {
            console.log("Erro para buscar véiculos na criação de veículos", error)
            setIsLoading(false)
        } finally {
            setIsLoading(false)
        }
    }

    async function searchDrivers() {
        setDrivers(null)
        setIsEmpty(false)
        setIsLoading(true)

        try {
            const data = await getDrivers({
                account_id: account_id
            })

            setDrivers(data.data)
        
        } catch (error) {
            console.log("Erro para buscar motoristas na criação de veículos", error)
            setIsLoading(false)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        searchVehicles()
        searchDrivers()
    }, [])

    const onSubmit = (data: FormValues) => {
        setIsLoading(true)
        const vehicleData: NewVehicle = {
            license_plate: data.license_plate,
            vehicle_type: data.vehicle_type
        }
        newVehicle({
            vehicle: vehicleData, driver_id: data.driver_id, account_id: account_id
        })
            .then((data: ApiReturn<Vehicle>) => {
                if(data.return == 'error') {
                    setIsLoading(false)
                } else {
                    router.push(
                        `/admin/accounts/${account_id}/vehicles/${vehicleData.license_plate.replace("-", "")}`
                    )
                }
            })
    }

    return (
        <>  
            {isLoading && (
                <p className="p-2 rounded-md border text-xl flex items-center text-rede-gray-400 bg-rede-gray-800 border-rede-gray-700 mb-4">
                    <AiOutlineLoading3Quarters className="mr-1 animate-spin h-4 w-4 text-rede-gray-400" />{' '}
                    Carregando...
                </p>
            )}

            {vehicles && (
                <form onSubmit={handleSubmit(onSubmit)}> 
                    <div className='border rounded-md p-4'>
                        {saveError.length > 0 && <FeedbackError text={saveError} />}

                        <div className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
                            <div className="sm:col-span-2">
                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                    Digite a Placa do veículo
                                </label>
                                <div className="mt-1">
                                    <PlateMaskedInput 
                                        vehicles={vehicles}
                                        register={register}
                                        setValue={setValue}
                                        name='license_plate'
                                        setIsCastrated={setIsCastrated}
                                        setHasVehicleType={setHasVehicleType}
                                        setVehicleRegistered={setVehicleRegistered}
                                    />
                                    {
                                        vehicleRegistered ? (
                                            <p className="font-semibold text-red-700 text-xs mt-1">
                                                Veículo já registrado nesta conta
                                            </p>
                                        ) : (
                                            <></>
                                        )
                                    }
                                </div>
                            </div>

                            {
                                hasVehicleType ? (
                                    <>
                                        <div className="sm:col-span-2">
                                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                                Tipo de veículo
                                            </label>
                                            <div className="mt-1">
                                                <select
                                                    {...register('vehicle_type', {
                                                        required: "Tipo obrigatório"
                                                    })}
                                                    id="vehicle_type"
                                                    name="vehicle_type"
                                                    className="w-full bg-white py-2 pl-3 pr-10 cursor-pointer text-sm leading-5 rounded-md text-rede-gray-300 border focus:outline-none border-rede-gray-400 focus:border-rede-blue/50"
                                                >
                                                    {
                                                        vehiclesMap.map((type: VehicleType) => {
                                                            return (
                                                                <option value={type.value} key={type.value}>
                                                                    {type.type}
                                                                </option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                                {errors.vehicle_type && (
                                                    <p className=" text-red-700 text-xs mt-1">
                                                        {errors.vehicle_type.message}
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="sm:col-span-2">
                                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                                Vincular com motorista (opcional)
                                            </label>
                                            <div className="mt-1">
                                                <select
                                                    {...register('driver_id')}
                                                    id='driver_id'
                                                    name='driver_id'
                                                    className="w-full bg-white py-2 pl-3 pr-10 cursor-pointer text-sm leading-5 rounded-md text-rede-gray-300 border focus:outline-none border-rede-gray-400 focus:border-rede-blue/50"
                                                >
                                                    {isEmpty ? (
                                                        <option value={""}>
                                                            -- Nenhum motorista cadastrado nesta conta --
                                                        </option>
                                                    ) : (
                                                        <option value={""}>
                                                            -- Selecione o Motorista --
                                                        </option>
                                                    )}
                                                        {drivers ? (
                                                            drivers.map((driver: Driver) => {
                                                                return (
                                                                    <option value={driver.driver_id} key={driver.driver_id}>
                                                                        {driver.driver_name}
                                                                    </option>
                                                                )
                                                            })
                                                        ) : (
                                                            <></>
                                                        )}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="pt-4">
                                            <button
                                            type="submit"
                                            disabled={isLoading}
                                            className={
                                                `inline-flex justify-center rounded-lg text-sm font-semibold py-2 px-4 text-white hover:bg-rede-green-400 dark:bg-gray-200 dark:hover:bg-white dark:text-slate-900 w-full` +
                                                (isLoading ? ' bg-rede-gray-400' : ' bg-rede-green')
                                            }
                                            >
                                            {isLoading ? (
                                                <AiOutlineLoading3Quarters className=" -ml-1 mr-2 h-5 w-5 text-white dark:text-slate-900 animate-spin " />
                                            ) : (
                                                <FaRegSave className=" -ml-1 mr-2 h-5 w-5 text-white dark:text-slate-900" />
                                            )}
                                            <span>CADASTRAR</span>
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <></>
                                )
                            }

                        </div>
                    </div>
                </form>
            )}
        </>
    )
}