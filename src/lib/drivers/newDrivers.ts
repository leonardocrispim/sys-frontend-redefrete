import { URL_BACKEND } from '@utils/utils';
import { Driver } from 'DriversTypes';
import { DbError, DbErrorKeys } from '@utils/dberror';
import { vinDriverVehicle } from './vinDrivers';

type DataType = {
  account_id: number
  driver_name: string;
  driver_cpf_cnpj: string;
  driver_telephone?: string | null;
  driver_whatsapp?: string | null;
  driver_email?: string | null;
  driver_status: string;
  driver_status_gr: string;
  created_by?: number | null;
  license_plate: string;
}

export async function newDriver(data: DataType) {
  try {
    const { license_plate, ...requestData} = data

    const response = await fetch(`${URL_BACKEND}/drivers/new`, {
      cache: 'no-store',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    });

    const ret = await response.json();

    if (ret.return == 'success') {
      
      if (data.license_plate !== "") {
        await vinDriverVehicle({
          account_id: data.account_id, license_plate: data.license_plate, driver_id: ret.data.driver_id
        })
  
        return ret
      } else {
        return ret
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
