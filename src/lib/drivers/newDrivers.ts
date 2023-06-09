import { URL_BACKEND } from '@utils/utils';
import { Driver } from 'DriversTypes';
import { DbError, DbErrorKeys } from '@utils/dberror';

export async function newDriver(data: Driver) {
  try {
    const response = await fetch(`${URL_BACKEND}/drivers/new`, {
      cache: 'no-store',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    
    const ret = await response.json();

    console.log(ret);

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
