import FeedbackError from '@/components/utils/feedbacks/FeedbackError';
import { getAccount } from '@/lib/accounts/getAccounts';
import { Account, Account_Address } from 'AccountsTypes';
import { ApiReturn } from 'UtilsTypes';
import AccountHeader from '../components/AccountHeader';
import TabsPage from '../components/TabsPage';

export const dynamic = 'force-dynamic';

type DataType = {
  params: {
    id: string;
  };
};

export default async function accountsDriversPage({ params }: DataType) {
  const count_id = Number(params.id);
  const account: ApiReturn<Account_Address> = await getAccount(count_id)
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
      <AccountHeader account={account.data as Account_Address} />

      <TabsPage current="bank" account_id={count_id} />

      <div className="pb-10 pt-5 bg-rede-gray-800">DADOS BANCARIOS</div>
    </div>
  );
}
//
