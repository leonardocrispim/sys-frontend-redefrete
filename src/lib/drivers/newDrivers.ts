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
  driver_birth_date?: string | null;
  driver_sex?: string | null;
  driver_rg?: string | null;
  driver_rg_uf?: string | null;
  driver_rg_date?: string | null;
  driver_father_name?: string | null;
  driver_mother_name?: string | null;
  driver_cnh_number?: string | null;
  driver_cnh_first_license?: string | null;
  driver_cnh_validate?: string | null;
  driver_cnh_uf?: string | null;
  driver_cnh_safety_code?: string | null;
  driver_cnh_category?: string | null;
  driver_status: string;
  driver_status_gr: string;
  address_zip_code?: string | null;
  address_street?: string | null;
  address_number?: string | null;
  address_complement?: string | null;
  address_district?: string | null;
  address_city?: string | null;
  address_state?: string | null;
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