import { Vehicle } from "VehiclesTypes";
import TabsPage from "../../components/TabsPage";
import { getVehicle } from "@/lib/vehicles/getVehicles";
import FeedbackError from "@/components/utils/feedbacks/FeedbackError";
import VehicleData from "./components/VehicleData";
import { getDriversByPlate } from "@/lib/drivers/getDrivers";
import DriversData from "./components/DriversData";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Driver } from "DriversTypes";

type DataType = {
    params: {
        id: string
        plate: string
    }
}

export default async function VehiclePage({ params }: DataType) {
    const account_id = Number(params.id)
    let isLoading = true

    const vehicle = await getVehicle(params.plate)
        .then((res: Vehicle) => {
            if(res) {
                return res
            } else {
                throw new Error('Veículo não encontrado');
            }
        })
        .catch((err) => {
            return <FeedbackError text={err.message} />
        })

    const drivers = await getDriversByPlate({ license_plate: params.plate, account_id: account_id })
        .then((res) => {
            if(res) {
                isLoading = false
                return res
            } else {
                throw new Error('Motoristas não encontrados')
            }
        })
        .catch((err) => {
            return <FeedbackError text={err.message} />
        }) 

    console.log("DRIVERS", drivers)

    return (
        <>
            <TabsPage current="vehicles" account_id={account_id} />

            {isLoading && (
                <p className="p-2 rounded-md border text-xl flex items-center text-rede-gray-400 bg-rede-gray-800 border-rede-gray-700 mb-4">
                    <AiOutlineLoading3Quarters className="mr-1 animate-spin h-4 w-4 text-rede-gray-400" />{' '}
                    Carregando...
                </p>
            )}

            {drivers && (
                <div className="px-4 py-6 border rounded-b-md">
                <VehicleData vehicle={vehicle} />

                <DriversData account_id={account_id} drivers={drivers} />
            </div>
            )}
        </>
    )
}