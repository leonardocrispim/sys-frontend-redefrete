import TagStatus from '@/components/drivers/TagStatus';
import { AiFillEye } from 'react-icons/ai';
import Link from 'next/link';
import {
  driversStatusGR,
  driversStatusGRKeys,
  driversStatusRF,
  driversStatusRFKeys,
} from '@/lib/utils/driversConstants';
import { Registration } from 'RegistrationsTypes';
import DriverItemList from './DriverItemList';
import { formatPlate } from '@/lib/utils/utils';

type DataProps = {
  registration: Registration;
};

export default function LineRegistration({ registration }: DataProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-6 gap-2 mb-2 border rounded-md p-2">
      <div className="sm:col-span-2 flex items-center">
        <DriverItemList registration={registration} />
      </div>
      <div className="flex items-center justify-center">
        <div className="">
          <p className="text-xs text-center font-bold mb-1">
            {registration.vehicle_type}
          </p>
          <div className="font-medium text-rede-gray-100">
            {formatPlate(registration.vehicle_license_plate)}
          </div>
        </div>
      </div>
      <div className="flex items-center  justify-center">
        <div className="">
          <p className="text-xs text-center font-bold mb-1">G. de Risco</p>
          <TagStatus status={registration.registration_status_gr}>
            {
              driversStatusGR[
                registration.registration_status_gr as driversStatusGRKeys
              ]
            }
          </TagStatus>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <div className="">
          <p className="text-xs text-center font-bold mb-1">Redefrete</p>

          <TagStatus status={registration.registration_status}>
            {
              driversStatusRF[
                registration.registration_status as driversStatusRFKeys
              ]
            }
          </TagStatus>
        </div>
      </div>

      <div className="flex items-center justify-end">
        <Link
          href={`/admin/registrations/${registration.driver_cpf_cnpj}`}
          title="Ver motorista"
          className="rounded-md mr-1 bg-rede-blue-300 p-2 text-white shadow-sm hover:bg-rede-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          <AiFillEye className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
