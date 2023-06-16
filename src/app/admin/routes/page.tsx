import PageTitle from '@/components/utils/PageTitle';
import RoutesTable from './components/RoutesTable';

export default async function RoutesListPage() {
  return (
    <>
      <div className="mb-5">
        <PageTitle>Lista de Rotas</PageTitle>
      </div>
      <RoutesTable />
    </>
  );
}
