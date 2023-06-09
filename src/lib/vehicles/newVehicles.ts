import { URL_BACKEND } from '@utils/utils';
import { DbError, DbErrorKeys } from '@utils/dberror';
import { Vehicle } from 'VehiclesTypes';

export async function newVehicle(data: Vehicle) {
  try {
    const response = await fetch(`${URL_BACKEND}/vehicles/new`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const ret = await response.json();

    if (ret.return == 'success') {
      return ret;
    } else {
      throw new Error(
        DbError[ret.data.code as DbErrorKeys] ||
          'Erro desconhecido, contate o administrador.'
      );
    }
  } catch (error: any) {
    return {
      return: 'error',
      message: error.message,
    };
  }
}
