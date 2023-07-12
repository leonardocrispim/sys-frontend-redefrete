import { URL_BACKEND } from '@utils/utils';
import { DbError, DbErrorKeys } from '@utils/dberror';
import { Driver } from 'DriversTypes';

export async function alterDriver(driver_id: number, data: Driver) {
  try {
    const response = await fetch(`${URL_BACKEND}/drivers/edit/${driver_id}`, {
      cache: 'no-store',
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
