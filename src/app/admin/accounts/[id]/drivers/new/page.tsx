import TabsPage from '../../components/TabsPage';
import DriversMenu from '../components/DriversMenu';
import NewForm from './components/NewForm';

type DataType = {
  params: {
    id: string;
  };
};

export default async function accountsDriverNewPage({ params }: DataType) {
  const accountId = Number(params.id);

  return (
    <>
      <TabsPage current="drivers" account_id={accountId} />

      <div className="px-4 py-6 border rounded-b-md">
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
          <div>
            <DriversMenu current="new" account_id={accountId} />
          </div>
          <div className="col-span-4">
            <NewForm account_id={accountId} />
          </div>
        </div>
      </div>
    </>
  );
}
