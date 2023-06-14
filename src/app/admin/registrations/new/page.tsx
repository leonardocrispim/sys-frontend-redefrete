import PageTitle from '@/components/utils/PageTitle';
import NewForm from './components/NewForm';

export default async function NewRegistrationPage() {
  return (
    <>
      <div className="mb-5">
        <PageTitle>Pré-Cadastro de Motorista</PageTitle>
      </div>
      <NewForm />
    </>
  );
}
