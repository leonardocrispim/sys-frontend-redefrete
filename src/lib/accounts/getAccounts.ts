import { URL_BACKEND } from '@utils/utils';
import { Account, Account_Address, AccountsSearchData } from 'AccountsTypes';
import { ApiReturn } from 'UtilsTypes';

export async function getAccount(id: number): Promise<ApiReturn<Account_Address>> {
  try {
    const response = await fetch(`${URL_BACKEND}/accounts/${id}`, {
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

export async function getAccounts(data?: AccountsSearchData) {
  try {
    let queryString = '';

    if (data && Object.keys(data).length > 0) {
      //@ts-expect-error
      const searchParams = new URLSearchParams(data);
      queryString = searchParams.toString();
    }

    const response = await fetch(`${URL_BACKEND}/accounts/?${queryString}`, {
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