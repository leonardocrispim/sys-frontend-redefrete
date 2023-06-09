import { URL_BACKEND } from '@utils/utils';

export async function getHub(id: number) {
  try {
    const response = await fetch(`${URL_BACKEND}/hubs/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await response.json();
  } catch {
    throw new Error('Erro de conexão');
  }
}

export async function getHubs() {
  try {
    const response = await fetch(`${URL_BACKEND}/hubs/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await response.json();
  } catch {
    throw new Error('Erro de conexão');
  }
}
