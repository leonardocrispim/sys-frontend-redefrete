import { URL_BACKEND } from '@utils/utils';
import { DbError, DbErrorKeys } from '@utils/dberror';
import { NewVehicle } from 'VehiclesTypes';
import { newVinAccountVehicle } from './newVinAccountVehicle';
import { vinDriverVehicle } from '../drivers/vinDrivers';

type DataType = {
  vehicle: NewVehicle;
  account_id: number;
  driver_id?: number
}

export async function newVehicle({ vehicle, account_id, driver_id }: DataType) {
  try {
    const response = await fetch(`${URL_BACKEND}/vehicles/new`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(vehicle),
    });

    const ret = await response.json();

    if (ret.return == 'success') {
      if (ret.data) {

        if(driver_id) {
          await vinDriverVehicle({
            driver_id: Number(driver_id),
            license_plate: vehicle.license_plate,
            account_id: account_id
          })
        }

        await newVinAccountVehicle({
          account_id: account_id, vehicle_id: ret.data.vehicle_id
        })

        return ret
      
      } else {
        return ret;
      }
      
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
