import ListTable from './components/ListTable';
import { ApiReturn } from 'UtilsTypes';
import { Account } from 'AccountsTypes';
import { getAccount } from '@/lib/accounts/getAccounts';
import FeedbackError from '@/components/utils/feedbacks/FeedbackError';
import AccountHeader from '../components/AccountHeader';
import TabsPage from '../components/TabsPage';
import DriversMenu from './components/DriversMenu';

type DataType = {
  params: {
    id: string;
  };
};

export default async function accountsPage({ params }: DataType) {
  const accountId = Number(params.id);

  const account: ApiReturn<Account> = await getAccount(accountId)
    .then((data) => {
      if (!data.data?.account_id) {
        throw new Error('Account not found');
      }
      return data;
    })
    .catch((error) => {
      return {
        data: undefined,
        return: 'error',
      };
    });

  if (account.return == 'error') {
    return (
      <div className="mb-10">
        <FeedbackError text="Não foi possível carregar esta conta!" />
      </div>
    );
  }
  return (
    <>
      <AccountHeader account={account.data as Account} />

      <TabsPage current="drivers" account_id={accountId} />

      <div className="px-4 py-6 border rounded-b-md">
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
          <div>
            <DriversMenu current="list" account_id={accountId} />
          </div>
          <div className="col-span-4">
            <ListTable account_id={accountId} />
          </div>
        </div>
      </div>
    </>
  );
}
