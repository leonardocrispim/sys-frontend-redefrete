import { URL_BACKEND } from '@utils/utils';
import { DbError, DbErrorKeys } from '@utils/dberror';
import { getVehicle } from '../vehicles/getVehicles';
import { Vehicle } from 'VehiclesTypes';
import { newVehicle } from '../vehicles/newVehicles';
import { ApiReturn } from 'UtilsTypes';
import { DriverVinVehicles } from 'DriversTypes';

type TypeVinDriverVehicle = {
  driver_id: number;
  license_plate: string;
  vehicle_type?: string;
  account_id: number;
};

export async function vinDriverVehicle(data: TypeVinDriverVehicle) {
  try {
    let vehicle: Vehicle = await getVehicle(data.license_plate);
    if (!vehicle) {
      const nVehicle = await newVehicle({
        license_plate: data.license_plate,
        vehicle_type: data.vehicle_type as string,
        account_id: data.account_id
      });

      vehicle = nVehicle.data;
    }

    const response = await fetch(`${URL_BACKEND}/drivers/vin-vehicle`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        driver_id: data.driver_id,
        vehicle_id: vehicle.vehicle_id,
      }),
    });

    const ret: ApiReturn<DriverVinVehicles | any> = await response.json();

    if (ret.return == 'success') {
      return {
        return: 'success',
        data: ret.data,
      };
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
