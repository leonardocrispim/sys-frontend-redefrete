import { URL_BACKEND, removeEspecialChars } from '@utils/utils';

export async function getVehicle(plate: string) {
  plate = removeEspecialChars(plate);
  try {
    const response = await fetch(`${URL_BACKEND}/vehicles/${plate}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const ret = await response.json()

    return ret;
  } catch {
    throw new Error('Erro de conexão com backend');
  }
}
