import { getAccount } from '@/lib/accounts/getAccounts';
import TabsPage from './components/TabsPage';
import { ApiReturn } from 'UtilsTypes';
import { Account, Account_Address } from 'AccountsTypes';
import AccountData from './tabsContents/AccountData';

type DataType = {
  params: {
    id: string;
  };
};

export default async function accountsPage({ params }: DataType) {
  const account_id = Number(params.id);

  const account: ApiReturn<Account_Address> = await getAccount(account_id)
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

  return (
    <>
      <TabsPage current="data" account_id={account_id} />
      <div className="pb-10 pt-5 bg-rede-gray-800">
        <AccountData account={account.data as Account_Address} />
      </div>
    </>
  );
}
