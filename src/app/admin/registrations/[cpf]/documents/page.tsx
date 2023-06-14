import FeedbackError from '@/components/utils/feedbacks/FeedbackError';
import { getRegistration } from '@/lib/registrations/getRegistrations';
import { Registration } from 'RegistrationsTypes';
import { ApiReturn } from 'UtilsTypes';

import TabsPage from '../components/TabsPage';
import RegistrationHeader from '../components/RegistrationHeader';
import { CNHDropZone } from './components/DropZone';

export const dynamic = 'force-dynamic';

type DataType = {
  params: {
    cpf: string;
  };
};

export default async function registrationDocumentsPage({ params }: DataType) {
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
      <RegistrationHeader registration={registration.data} />

      <TabsPage current="documents" cpf_cnpj={params.cpf} />

      <div className="pb-10 pt-5 bg-rede-gray-800">
        <CNHDropZone />
      </div>
    </div>
  );
}
