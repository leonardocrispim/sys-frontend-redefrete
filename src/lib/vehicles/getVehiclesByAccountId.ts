import { URL_BACKEND } from '@utils/utils';
import { VehiclesSearchData } from 'VehiclesTypes';

//Botar a Promise
export async function getVehiclesByAccountId(data?: VehiclesSearchData) {
  try {
    let queryString = '';
    if (data && Object.keys(data).length > 0) {
      //@ts-expect-error
      const searchParams = new URLSearchParams(data);
      queryString = searchParams.toString();
    }

    const response = await fetch(`${URL_BACKEND}/vehicles/?${queryString}`, {
      cache: 'no-cache',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await response.json();
  } catch (error) {
    throw new Error('Erro de conexão com backend');
  }
}
