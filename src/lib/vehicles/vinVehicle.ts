import { URL_BACKEND } from '@utils/utils';
import { DbError, DbErrorKeys } from '@utils/dberror';
import { getDriver } from '../drivers/getDrivers';
import { newDriver } from '../drivers/newDrivers';
import { Driver, DriverVinVehicles } from 'DriversTypes';
import { driversStatusRF } from '../utils/driversConstants';
import { ApiReturn } from 'UtilsTypes';

type NewDriver = {
  account_id: number;
  driver_name: string;
  driver_cpf_cnpj: string;
  driver_telephone?: string | null;
  driver_email?: string | null;
};

type VinVehicleDriver = {
  vehicle_id: number | undefined;
  driver: NewDriver;
};

export async function vinVehicleDriver(data: VinVehicleDriver) {
  try {
    let driver: Driver = await getDriver(data.driver.driver_cpf_cnpj);

    if (!driver.driver_cpf_cnpj) {
      console.log('entrou para cadstro motorista');
      const nDriver = await newDriver({
        account_id: data.driver.account_id,
        driver_cpf_cnpj: data.driver.driver_cpf_cnpj,
        driver_name: data.driver.driver_name,
        driver_telephone: data.driver.driver_telephone,
        driver_email: data.driver.driver_email,
        driver_status: 'NOVO_CADASTRO',
        license_plate: '',
      });

      driver = nDriver.data;
    }

    const response = await fetch(`${URL_BACKEND}/drivers/vin-vehicle`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        driver_id: driver.driver_id,
        vehicle_id: data.vehicle_id,
      }),
    });

    const ret: ApiReturn<DriverVinVehicles | any> = await response.json();

    console.log('RET', ret);

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
