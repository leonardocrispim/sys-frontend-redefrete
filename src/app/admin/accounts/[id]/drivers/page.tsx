import ListTable from './components/ListTable';

import TabsPage from '../components/TabsPage';
import DriversMenu from './components/DriversMenu';

type DataType = {
  params: {
    id: string;
  };
};

export default async function accountsPage({ params }: DataType) {
  const accountId = Number(params.id);

  return (
    <>
      <TabsPage current="drivers" account_id={accountId} />

      <div className="px-4 py-6 border rounded-b-md">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
          <div className="col-span-3">
            <DriversMenu current="list" account_id={accountId} />
          </div>
          <div className="col-span-9">
            <ListTable account_id={accountId} />
          </div>
        </div>
      </div>
    </>
  );
}
