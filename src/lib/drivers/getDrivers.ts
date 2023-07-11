import { URL_BACKEND, removeEspecialChars } from '@utils/utils';
import { Driver, DriversSearchData } from 'DriversTypes';

export async function getDriver(cpf_cnpj: string): Promise<Driver> {
  const cpf = removeEspecialChars(cpf_cnpj);
  try {
    const response = await fetch(`${URL_BACKEND}/drivers/${cpf}`, {
      cache: 'no-cache',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const ret = await response.json();
    return ret;
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

type DataProps = {
  license_plate: string;
  account_id: number;
};

export async function getDriversByPlateAndAccount({
  license_plate,
  account_id,
}: DataProps) {
  try {
    const response = await fetch(
      `${URL_BACKEND}/drivers/plate/${license_plate}/${account_id}`,
      {
        cache: 'no-cache',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return await response.json();
  } catch {
    throw new Error('Erro de conexão com backend');
  }
}

export async function getDriversByPlate(license_plate: string) {
  try {
    const response = await fetch(
      `${URL_BACKEND}/drivers/plate/${license_plate}`,
      {
        cache: 'no-cache',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return await response.json();
  } catch {
    throw new Error('Erro de conexão com backend');
  }
}
