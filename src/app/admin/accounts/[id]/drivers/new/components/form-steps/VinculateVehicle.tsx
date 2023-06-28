import { RdVehicles } from "../../../../vehicles/components/ListVehicles";

export type DataProps = {
    register: any;
    vehicles: RdVehicles[] | null | undefined;
    isEmpty: boolean
}

export function VinculateVehicle({
    register,
    vehicles,
    isEmpty
}: DataProps) {
    return (
        <div className="border rounded-md p-4 mt-4">
            <div className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-4">
                <div className="mb-2 sm:col-span-6">
                    <h2 className="font-semibold text-gray-800 text-lg underline-offset-8 underline">
                    Víncular este motorista com veículo
                    </h2>
                </div>
                <div className="sm:col-span-4">
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                        Víncular motorista com veículo (opcional)
                    </label>
                    <div className="mt-1">
                        <select
                            {...register('license_plate')}
                            className="block bg-white w-full text-sm p-2 border rounded-md focus:outline-0 text-rede-gray-300 placeholder:text-rede-gray-500 placeholder:text-sm"
                            name="license_plate"
                            id="license_plate"
                        >
                        <>
                            {isEmpty ? (
                                <option value={''}>
                                    -- Nenhum veículo cadastrado nesta conta --
                                </option>
                            ) : (
                                <option value={''}>-- Selecione a placa --</option>
                            )}

                            {vehicles ? (
                            vehicles.map((vehicle: RdVehicles) => (
                                <option
                                    value={vehicle.rd_vehicles.license_plate}
                                    key={vehicle.rd_vehicles.vehicle_id}
                                >
                                    {vehicle.rd_vehicles.license_plate}
                                </option>
                            ))
                            ) : (
                            <></>
                            )}
                        </>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    )
}