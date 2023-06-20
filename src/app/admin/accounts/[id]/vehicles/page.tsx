import TabsPage from '../components/TabsPage';

import VehiclesMenu from './components/VehiclesMenu';

export const dynamic = 'force-dynamic';

type DataType = {
  params: {
    id: string;
  };
};

export default async function accountsDriversPage({ params }: DataType) {
  const account_id = Number(params.id);

  return (
    <div>
      <TabsPage current="vehicles" account_id={account_id} />

      <div className="px-4 py-6 border rounded-b-md">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
          <div className="col-span-3">
            <VehiclesMenu current='List' account_id={account_id} />
          </div>
        </div>
      </div>
    </div>
  );
}
