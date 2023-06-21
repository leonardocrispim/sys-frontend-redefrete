import { Vehicle } from "VehiclesTypes";
import TabsPage from "../../components/TabsPage";
import { getVehicle } from "@/lib/vehicles/getVehicles";
import FeedbackError from "@/components/utils/feedbacks/FeedbackError";
import VehicleData from "./components/VehicleData";

type DataType = {
    params: {
        id: string
        plate: string
    }
}

export default async function VehiclePage({ params }: DataType) {
    const account_id = Number(params.id)

    const vehicle = await getVehicle(params.plate)
        .then((res: Vehicle) => {
            if(res) {
                return res
            } else {
                throw new Error('Motorista não encontrado');
            }
        })
        .catch((err) => {
            return <FeedbackError text={err.message} />
        })
    
    return (
        <>
            <TabsPage current="vehicles" account_id={account_id} />

            <div className="px-4 py-6 border rounded-b-md">
                <VehicleData vehicle={vehicle} />
            </div>
        </>
    )
}