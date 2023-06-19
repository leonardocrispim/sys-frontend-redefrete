import TabsPage from '../components/TabsPage';

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

      <div className="pb-10 pt-5 bg-rede-gray-800">VEÍCULOS</div>
    </div>
  );
}
