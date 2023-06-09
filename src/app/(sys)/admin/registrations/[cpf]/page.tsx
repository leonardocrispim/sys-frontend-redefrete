import FeedbackError from '@/components/utils/feedbacks/FeedbackError';
import { getRegistration } from '@/lib/registrations/getRegistrations';
import { Registration } from 'RegistrationsTypes';
import { ApiReturn } from 'UtilsTypes';
import RegistrationData from './components/RegistrationData';
import PageTitle from '@/components/utils/PageTitle';
import TagStatus from '@/components/drivers/TagStatus';
import {
  driversStatusGR,
  driversStatusGRKeys,
  driversStatusRF,
  driversStatusRFKeys,
} from '@/lib/utils/driversConstants';
import { timestampToBR } from '@/lib/utils/utils';
import RiskManangerButton from './components/RiskManangerButton';

export const dynamic = 'force-dynamic';

type DataType = {
  params: {
    cpf: string;
  };
};

export default async function registrationPage({ params }: DataType) {
  const registration: ApiReturn<Registration> = await getRegistration(
    params.cpf
  );

  if (registration?.data?.registration_id == undefined) {
    return (
      <div className="mb-10">
        <FeedbackError text="Link inválido!" />
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-4 mb-5 border-b pb-4">
        <div className="sm:col-span-2">
          <PageTitle>Dados do Pré Cadastro</PageTitle>
          <p className="text-rede-gray-200">
            <span className="font-bold">Data:</span>{' '}
            {timestampToBR(registration.data.created_at as string)}
          </p>
        </div>
        <div className="flex items-center">
          <div className="w-full">
            <div className="text-xs mb-1 text-center font-medium text-rede-gray-400">
              Gerenciadora de Risco
            </div>
            <TagStatus status={registration.data.registration_status_gr}>
              {
                driversStatusGR[
                  registration.data
                    .registration_status_gr as driversStatusGRKeys
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
            <TagStatus status={registration.data.registration_status}>
              {
                driversStatusRF[
                  registration.data.registration_status as driversStatusRFKeys
                ]
              }
            </TagStatus>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <RiskManangerButton />
      </div>

      <div className="pb-10">
        <RegistrationData registration={registration.data} />
      </div>
    </div>
  );
}
