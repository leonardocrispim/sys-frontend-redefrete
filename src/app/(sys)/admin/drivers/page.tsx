import PageTitle from '@/components/utils/PageTitle';

import ListTable from './components/ListTable';

export default async function RoutesListPage() {
  return (
    <>
      <div className="mb-5">
        <PageTitle>Lista de Motoristas</PageTitle>
      </div>

      <div className="">
        <ListTable />
      </div>
    </>
  );
}
