import { URL_BACKEND } from '@utils/utils';

import { User } from 'UsersTypes';

export async function getRoutesSearch(data: any, user?: User) {
  try {
    let queryString = '';

    if (user?.user_type == 'DISPATCHER') {
      const hubsDis = user?.rd_vin_users_hubs?.map((hub) => hub.hub_id);

      if (data.hub_id && data.hub_id.length > 1) {
        data.hub_id = data.hub_id
          .split(',')
          //@ts-expect-error
          .filter((id: string) => hubsDis.includes(Number(id)))
          .join(',');
      } else {
        data.hub_id = hubsDis?.join(',');
      }
    }

    if (data && Object.keys(data).length > 0) {
      const searchParams = new URLSearchParams(data);
      queryString = searchParams.toString();
    }

    const response = await fetch(
      `${URL_BACKEND}/routes/search?${queryString}`,
      {
        cache: 'no-cache',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const ret = await response.json();

    return ret;
  } catch {
    throw new Error('Erro de conexão com backend');
  }
}
