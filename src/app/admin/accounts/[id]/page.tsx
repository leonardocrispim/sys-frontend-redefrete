import FeedbackError from '@/components/utils/feedbacks/FeedbackError';

import { ApiReturn } from 'UtilsTypes';

import TabsPage from './components/TabsPage';
import AccountHeader from './components/AccountHeader';
import { getAccount } from '@/lib/accounts/getAccounts';
import { Account } from 'AccountsTypes';
import AccountData from './tabsContents/AccountData';

export const dynamic = 'force-dynamic';

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
    <div>
      <AccountHeader account={account.data as Account} />

      <TabsPage current="data" account_id={accountId} />

      <div className="pb-10 pt-5 bg-rede-gray-800">
        <AccountData account={account.data as Account} />
      </div>
    </div>
  );
}
