import PageTitle from '@/components/utils/PageTitle';
import SearchTool from './components/SearchTool';

export default async function RegistrationsListPage() {
  return (
    <>
      <div>
        <div className="mb-5">
          <PageTitle> Lista de Contas</PageTitle>
        </div>
        <div className="mb-4">
          <SearchTool />
        </div>
      </div>
    </>
  );
}
