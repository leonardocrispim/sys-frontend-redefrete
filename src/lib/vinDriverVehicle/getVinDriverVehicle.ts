import { URL_BACKEND } from '../utils/utils';

type DataType = {
  vin_id: number;
};

export async function getVinDriverVehicle({ vin_id }: DataType) {
  try {
    const response = await fetch(`${URL_BACKEND}/vinDriverVehicle/${vin_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.log('erro', error);
  }
}
