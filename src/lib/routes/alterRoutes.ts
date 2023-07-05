import { URL_BACKEND } from '@utils/utils';
import { Route } from 'RoutesTypes';
import { DbError, DbErrorKeys } from '@utils/dberror';

export async function editRoute(route: Route) {
  try {
    const {
      route_id,
      route_code,
      rd_drivers,
      rd_vehicles,
      rd_hubs,
      created_at,
      updated_at,
      rd_packages,
      ...data
    } = route;

    const response = await fetch(`${URL_BACKEND}/routes/edit/${route_code}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const ret = await response.json();

    console.log(route_code);
    console.log(data);

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
