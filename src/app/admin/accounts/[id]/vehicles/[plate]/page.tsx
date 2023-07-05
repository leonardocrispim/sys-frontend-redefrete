import { Vehicle } from "VehiclesTypes";
import TabsPage from "../../components/TabsPage";
import { getVehicle } from "@/lib/vehicles/getVehicles";
import FeedbackError from "@/components/utils/feedbacks/FeedbackError";
import VehicleData from "./components/VehicleData";
import { getDriversByPlate, getDriversByPlateAndAccount } from "@/lib/drivers/getDrivers";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import PageTitle from "@/components/utils/PageTitle";
import { Vin_drivers } from "DriversTypes";
import DriverMap from "./components/DriverMap";

type DataType = {
    params: {
        id: string
        plate: string
    }
}

export default async function VehiclePage({ params }: DataType) {
    const account_id = Number(params.id)
    let isLoading = true
    let vehicleOk = false

    function verifyVehicleInfos(res: Vehicle) {
        if(res.vehicle_type == null || res.license_plate == null || res.vehicle_renavam == null || res.rd_vehicle_meta.vehicle_owner_cpf_cnpj == null || res.rd_vehicle_meta.vehicle_owner_birth_date == null || res.rd_vehicle_meta.vehicle_owner_name == null || res.rd_vehicle_meta.vehicle_owner_father_name == null || res.rd_vehicle_meta.vehicle_owner_mother_name == null || res.rd_vehicle_meta.vehicle_owner_rg == null || res.rd_vehicle_meta.vehicle_owner_rg_date == null || res.rd_vehicle_meta.vehicle_owner_rg_uf == null || res.rd_vehicle_meta.vehicle_owner_sex == null) {
            vehicleOk = false
        } else {
            vehicleOk = true
        }
    }

    const vehicle : Vehicle = await getVehicle(params.plate)
        .then((res) => {
            if(res) {
                verifyVehicleInfos(res)
                return res
            } else {
                throw new Error('Veículo não encontrado');
            }
        })
        .catch((err) => {
            return <FeedbackError text={err.message} />
        })

    const drivers = await getDriversByPlateAndAccount({ license_plate: params.plate, account_id: account_id })
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

    return (
        <>
            <TabsPage current="vehicles" account_id={account_id} />

            {isLoading && (
                <p className="p-2 rounded-md border text-xl flex items-center text-rede-gray-400 bg-rede-gray-800 border-rede-gray-700">
                    <AiOutlineLoading3Quarters className="mr-1 animate-spin h-4 w-4 text-rede-gray-400" />{' '}
                    Carregando...
                </p>
            )}

            {drivers && (
                <div className="px-4 py-6 border rounded-b-md">
                <VehicleData vehicle={vehicle} />

                {/* <DriversData account_id={account_id} vehicle_id={vehicle.vehicle_id} drivers={drivers} /> */}
                <div className="mb-5">
                    <PageTitle>Motorista(s)</PageTitle>
                </div>

                {drivers.map((driver: Vin_drivers) => {
                    return (
                        <DriverMap key={driver.driver_id} vehicleOk={vehicleOk} driver={driver} vehicle={vehicle} account_id={account_id} />
                    );
                })}

                {drivers && drivers.length == 0 && (
                    <div className="border rounded-md p-4 mb-2">
                        <div className="text-rede-red-400 text-lg">
                            Não há motoristas vinculados a este veículo
                        </div>
                    </div>
                )}
            </div>
            )}
        </>
    )
}