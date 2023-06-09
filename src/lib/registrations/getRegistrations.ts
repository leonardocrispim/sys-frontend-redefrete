import { URL_BACKEND } from '@utils/utils';
import { RegistrationsSearchData } from 'RegistrationsTypes';

export async function getRegistration(cpf_cnpj: string) {
  try {
    const response = await fetch(`${URL_BACKEND}/registrations/${cpf_cnpj}`, {
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

export async function getRegistrations(data?: RegistrationsSearchData) {
  try {
    let queryString = '';

    if (data && Object.keys(data).length > 0) {
      //@ts-expect-error
      const searchParams = new URLSearchParams(data);
      queryString = searchParams.toString();
    }

    const response = await fetch(
      `${URL_BACKEND}/registrations/?${queryString}`,
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
