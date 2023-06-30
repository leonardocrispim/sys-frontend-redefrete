import { URL_BACKEND } from '@utils/utils';
import { DbError, DbErrorKeys } from '@utils/dberror';
import { Account } from 'AccountsTypes';
import { Driver, Driver_Infos } from 'DriversTypes';
import { newDriver } from '../drivers/newDrivers';

type DataProps = {
  account: Account;
  createDriver: boolean
}

export async function newAccount({ account, createDriver }: DataProps) {
  try {
    const response = await fetch(`${URL_BACKEND}/accounts/new`, {
      cache: 'no-store',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(account),
    });

    const ret = await response.json();

    if (ret.return == 'success') {

      if(createDriver) {
        const data: Driver_Infos = {
          account_id: ret.data.account_id,
          driver_name: account.account_name,
          driver_cpf_cnpj: account.account_cpf_cnpj,
          driver_telephone: account.account_telephone ? account.account_telephone : "",
          driver_whatsapp: account.account_whatsapp ? account.account_whatsapp : "",
          driver_email: account.account_email ? account.account_email : "",
          driver_status: 'NOVO_CADASTRO',
          driver_status_gr: 'NAO_ENVIADO',
          address_zip_code: account.address_zip_code ? account.address_zip_code : "",
          address_city: account.address_city ? account.address_city : "",
          address_district: account.address_district ? account.address_district : "",
          address_complement: account.address_complement ? account.address_complement : "",
          address_street: account.address_street ? account.address_street : "",
          address_number: account.address_number ? account.address_number : "",
          address_state: account.address_state ? account.address_state : "",
          created_by: account.created_by ? account.created_by : null,
          license_plate: ""
        }

        await newDriver(data)

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
