import PageTitle from '@/components/utils/PageTitle';
import NewForm from './components/NewForm';

export default async function NewDriverPage() {
  return (
    <>
      <div className="mb-5">
        <PageTitle>Cadastro de Motorista</PageTitle>
      </div>
      <NewForm />
    </>
  );
}
