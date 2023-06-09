import { URL_BACKEND } from '@utils/utils';

import { User } from 'UsersTypes';
import querystring from 'querystring';

export async function getRoutesSearch(data: any, user?: User) {
  try {
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

    const queryParams = querystring.stringify(data);
    const response = await fetch(
      `${URL_BACKEND}/routes/search?${queryParams}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return await response.json();
  } catch (error: any) {
    throw new Error(error.message);
  }
}

// export async function teste(code: string) {
//   try {
//     const response = await fetch(`${URL_BACKEND}/routes/teste`, {
//       method: 'POST',
//       body: JSON.stringify({ code: code }),
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });
//     return await response.json();
//   } catch (error: any) {
//     throw new Error(error.message);
//   }
// }
