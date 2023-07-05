import FormTitle from "@/components/forms/FormTitle";
import { Driver } from "DriversTypes";

type DataProps = {
    register: any
    errors: any
    isEmpty: boolean
    drivers: Driver[] | null | undefined
}

export default function VinculateDriver({
    register,
    errors,
    isEmpty,
    drivers
}: DataProps) {
    return (
        <div className="border rounded-md p-4 mt-4">
            <div className="mb-6 flex items-center">
                <FormTitle content="Víncular este veículo com motorista" />
            </div>

            <div>
                <label className="block text-sm font-medium leading-6 text-gray-900">
                    Vincular com motorista (opcional)
                </label>
                <div className="mt-1">
                <select
                    {...register('driver_id')}
                    id="driver_id"
                    name="driver_id"
                    className="w-full bg-white py-2 pl-3 pr-10 cursor-pointer text-sm leading-5 rounded-md text-rede-gray-300 border focus:outline-none"
                >
                    {isEmpty ? (
                    <option value={''}>
                        -- Nenhum motorista cadastrado nesta conta --
                    </option>
                    ) : (
                    <option value={''}>
                        Selecione
                    </option>
                    )}
                    {drivers ? (
                    drivers.map((driver: Driver) => {
                        return (
                        <option value={driver.driver_id} key={driver.driver_id}>
                            {driver.driver_name}
                        </option>
                        );
                    })
                    ) : (
                    <></>
                    )}
                </select>
                </div>
            </div>
        </div>
    )
}