import TagStatus from '@/components/drivers/TagStatus';
import PageTitle from '@/components/utils/PageTitle';
import {
  driversStatusGR,
  driversStatusGRKeys,
  driversStatusRF,
  driversStatusRFKeys,
} from '@/lib/utils/driversConstants';
import { timestampToBR } from '@/lib/utils/utils';
import { Registration } from 'RegistrationsTypes';

type PropsType = {
  registration: Registration;
};

export default function RegistrationHeader({ registration }: PropsType) {
  return (
    <div className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-4 mb-5 border-b pb-4">
      <div className="sm:col-span-2">
        <PageTitle>Dados do Pré Cadastro</PageTitle>
        <p className="text-rede-gray-200">
          <span className="font-bold">Data:</span>{' '}
          {timestampToBR(registration.created_at as string)}
        </p>
      </div>
      <div className="flex items-center">
        <div className="w-full">
          <div className="text-xs mb-1 text-center font-medium text-rede-gray-400">
            Gerenciadora de Risco
          </div>
          <TagStatus status={registration.registration_status_gr}>
            {
              driversStatusGR[
                registration.registration_status_gr as driversStatusGRKeys
              ]
            }
          </TagStatus>
        </div>
      </div>
      <div className="flex items-center">
        <div className="w-full">
          <div className="text-xs mb-1 text-center font-medium text-rede-gray-400">
            Redefrete
          </div>
          <TagStatus status={registration.registration_status}>
            {
              driversStatusRF[
                registration.registration_status as driversStatusRFKeys
              ]
            }
          </TagStatus>
        </div>
      </div>
    </div>
  );
}
