import { Driver } from 'DriversTypes';
import DriverItemList from './DriverItemList';
import TagStatus from '@/components/drivers/TagStatus';
import { AiFillEye } from 'react-icons/ai';
import Link from 'next/link';
import {
  driversStatusGR,
  driversStatusGRKeys,
  driversStatusRF,
  driversStatusRFKeys,
} from '@/lib/utils/driversConstants';

type DataProps = {
  driver: Driver;
  account_id: number;
};

export default function LineDriver({ driver, account_id }: DataProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-10 gap-2 mb-2 border rounded-md p-2">
      <div className="sm:col-span-5 flex items-center">
        <DriverItemList driver={driver} />
      </div>
      <div className="flex items-center gap-2 justify-center col-span-4">
        {/* <div className="">
          <p className="text-xs text-center font-bold mb-1">G. de Risco</p>
          <TagStatus status={driver.driver_status_gr}>
            {driversStatusGR[driver.driver_status_gr as driversStatusGRKeys]}
          </TagStatus>
        </div> */}

        <div className="">
          <p className="text-xs text-center font-bold mb-1">Redefrete</p>

          <TagStatus status={driver.driver_status}>
            {driversStatusRF[driver.driver_status as driversStatusRFKeys]}
          </TagStatus>
        </div>
      </div>

      <div className="flex items-center justify-end">
        <Link
          href={`/admin/accounts/${account_id}/drivers/${driver.driver_cpf_cnpj}`}
          title="Ver motorista"
          className="rounded-md mr-1 bg-rede-blue-300 p-2 text-white shadow-sm hover:bg-rede-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          <AiFillEye className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
