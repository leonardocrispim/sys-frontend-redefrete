import { RiskmanagerType } from 'RiskmanagerTypes';
import { DbError, DbErrorKeys } from '../utils/dberror';
import { URL_BACKEND } from '../utils/utils';
import { getVinDriverVehicle } from '../vinDriverVehicle/getVinDriverVehicle';

type DataType = {
  vin_id: number;
};

export async function newRiskManager({ vin_id }: DataType) {
  const grData: RiskmanagerType = await getVinDriverVehicle({ vin_id });

  console.log('GRDATA', grData);

  try {
    const response = await fetch(`${URL_BACKEND}/riskmanager/attached_search`, {
      cache: 'no-store',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(grData),
    });

    const ret = await response.json();

    console.log('retttt', ret);

    if (ret.return == 'success') {
      console.log('RET RISK MANAGER', ret);
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
