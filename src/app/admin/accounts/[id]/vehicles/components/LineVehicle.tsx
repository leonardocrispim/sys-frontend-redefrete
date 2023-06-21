import { getDriversByVehicleId } from "@/lib/drivers/getDriversByVehiclesId"
import { rd_vin_drivers_vehicles_info } from "DriversTypes"
import { ApiReturn } from "UtilsTypes"
import { Vehicle } from "VehiclesTypes"
import { useEffect, useState } from "react"

import { AiOutlineLoading3Quarters, AiFillEye } from 'react-icons/ai';
import Link from "next/link"

type DataProps = {
    vehicle: Vehicle,
    account_id: number
}

export default function LineVehicle({ vehicle, account_id }: DataProps) {
    const [drivers, setDrivers] = useState<rd_vin_drivers_vehicles_info[] | null | undefined>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [isEmpty, setIsEmpty] = useState<boolean>(false)

    async function searchDrivers() {
        setDrivers(null)
        setIsLoading(true)

        try {
            const data: ApiReturn<rd_vin_drivers_vehicles_info[]> = await getDriversByVehicleId({
                vehicle_id: vehicle.vehicle_id
            })

            if (data.data && data.data.length == 0) {
                setIsEmpty(true)
            } else {
                setDrivers(data.data)
            }
        } catch (error) {
            console.log("erro lineVehicles", error)
            setIsLoading(false)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        searchDrivers()
    }, [])

    function formatPlate(plate: string) {
        if (plate.length >= 4) {
            return plate.slice(0, 3) + "-" + plate.slice(3)
        } else {
            return plate
        }
    }

    let plateFormated = formatPlate(vehicle.license_plate)
    
    return (
        <>
            {isLoading && (
                <p className="p-2 rounded-md border text-xl flex items-center text-rede-gray-400 bg-rede-gray-800 border-rede-gray-700 mb-4">
                    <AiOutlineLoading3Quarters className="mr-1 animate-spin h-4 w-4 text-rede-gray-400" />{' '}
                    Carregando...
                </p>
            )}
            
            {drivers && (
                <div className="grid grid-cols-1 sm:grid-cols-10 mb-2 border rounded-md p-2">
                    <div className="flex items-center gap-2 justify-evenly col-span-6">
                        <div>
                            <p className="text-xs text-center font-bold mb-1">
                                Placa
                                <span className="block w-full text-center items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ring-rede-blue-300/90 text-rede-blue-300 bg-rede-blue-800">
                                    <p>{plateFormated}</p>
                                </span>
                            </p>
                        </div>
                        
                        <div>
                            <p className="text-xs text-center font-bold mb-1">
                                Tipo de Veículo
                                <span className="block w-full text-center items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ring-rede-gray-300/90 text-rede-gray-200/90 bg-rede-gray-600">
                                    <p>{vehicle.vehicle_type}</p>
                                </span>
                            </p>
                        </div>

                        <div className="w-40 flex justify-center">
                            <p className="text-xs text-center font-bold mb-1">
                                Motoristas vinculados
                                <span  className={`block w-full text-center items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ring-rede-gray-300/90 ${drivers.length === 0 ? 'text-red-500' : 'text-rede-gray-200/90'} bg-rede-gray-600`}>
                                    <p>{drivers.length == 0 ? 'Sem Vínculo' : drivers.length}</p>
                                </span>
                            </p>
                        </div>
                    </div>

                    <div className=" w-56 flex items-center justify-end">
                        <Link
                            href={`/admin/accounts/${account_id}/vehicles/${vehicle.license_plate}`}
                            title='Ver Veículo'
                            className="rounded-md bg-rede-blue-300 p-2 text-white shadow-sm hover:bg-rede-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            <AiFillEye className="h-4 w-4" aria-hidden="true" />
                        </Link>
                    </div>
                </div>
            )}
        </>
    )
}