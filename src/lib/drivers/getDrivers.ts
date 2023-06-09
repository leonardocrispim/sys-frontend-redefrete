import querystring from 'querystring';

import { URL_BACKEND } from '@utils/utils';
import { DriversSearchData } from 'DriversTypes';

//

export async function getDriver(cpf_cnpj: string) {
  try {
    const response = await fetch(`${URL_BACKEND}/drivers/${cpf_cnpj}`, {
      cache: 'no-cache',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await response.json();
  } catch {
    throw new Error('Erro de conexão com backend');
  }
}

export async function getDrivers(data?: DriversSearchData) {
  try {
    let queryString = '';

    if (data && Object.keys(data).length > 0) {
      //@ts-expect-error
      const searchParams = new URLSearchParams(data);
      queryString = searchParams.toString();
    }

    const response = await fetch(`${URL_BACKEND}/drivers/?${queryString}`, {
      cache: 'no-cache',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await response.json();
  } catch {
    throw new Error('Erro de conexão com backend');
  }
}

export async function getDriversByPlate(plate: string) {
  try {
    const response = await fetch(`${URL_BACKEND}/drivers/plate/${plate}`, {
      cache: 'no-cache',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await response.json();
  } catch {
    throw new Error('Erro de conexão com backend');
  }
}
