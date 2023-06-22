import { URL_BACKEND } from "../utils/utils";
import { DbError, DbErrorKeys } from "../utils/dberror";

type DataType = {
    account_id: number;
    vehicle_id: number;
}

export async function newVinAccountVehicle({ account_id, vehicle_id}: DataType) {
    const data: DataType = {
        vehicle_id,
        account_id
    }

    try {
        const response = await fetch(`${URL_BACKEND}/vehicles/new/vinAccount`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })

        const ret = await response.json()

        if (ret.return == 'success') {
            return ret
        } else {
            throw new Error(
                DbError[ret.data.code as DbErrorKeys] ||
                'Erro desconhecido, contate o administrador.'
            )
        }
    } catch (error: any) {
        return {
            return: 'error',
            message: error.message
        }
    }
}