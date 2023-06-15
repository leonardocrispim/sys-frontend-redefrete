import PageTitle from '@/components/utils/PageTitle';
import NewForm from './components/NewForm';

export default async function AccountsNewPage() {
  return (
    <>
      <div className="mb-5">
        <PageTitle>Cadastro de Conta</PageTitle>
      </div>
      <NewForm />
    </>
  );
}
