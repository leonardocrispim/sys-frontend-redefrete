import { Vehicle } from "VehiclesTypes"

type DataProps = {
    vehicle: Vehicle,
    account_id: number
}

export default function LineVehicle({ vehicle, account_id }: DataProps) {

    function formatPlate(plate: string) {
        if (plate.length >= 4) {
            return plate.slice(0, 3) + "-" + plate.slice(3)
        } else {
            return plate
        }
    }

    let plateFormated = formatPlate(vehicle.license_plate)
    
    return (
        <div className="grid grid-cols-1 sm:grid-cols-10 mb-2 border rounded-md p-2">
            <div className="flex items-center gap-2 justify-evenly col-span-4">
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
            </div>
            
            
        </div>
    )
}