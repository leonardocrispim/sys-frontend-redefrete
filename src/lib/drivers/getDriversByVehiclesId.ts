import { rd_vin_drivers_vehicles_info } from "DriversTypes";
import { ApiReturn } from "UtilsTypes";
import { URL_BACKEND } from '@utils/utils';

type DataType = {
    vehicle_id: number | undefined
}

export async function getDriversByVehicleId({ vehicle_id } : DataType): Promise<ApiReturn<rd_vin_drivers_vehicles_info[]>> {
    try {
        const response = await fetch(`${URL_BACKEND}/drivers/vin-vehicle/${vehicle_id}`, {
            cache: 'no-cache',
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        })
        return await response.json()
    } catch (error) {
        throw new Error('Erro de conexão com backend');
    }
}