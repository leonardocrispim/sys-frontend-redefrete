import { URL_BACKEND } from '@utils/utils';

type DataType = {
    account_id: number
}

export async function getVehiclesByAccountId({ account_id }: DataType) {
    console.log("requisição", account_id)
    try {
        const response = await fetch(`${URL_BACKEND}/vehicles/by/${ account_id }`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return await response.json();
    } catch (error) {
        throw new Error('Erro de conexão com backend')
    }
}