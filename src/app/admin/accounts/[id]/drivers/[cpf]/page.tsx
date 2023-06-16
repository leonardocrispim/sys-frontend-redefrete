import { ApiReturn } from 'UtilsTypes';
import { Account } from 'AccountsTypes';
import { getAccount } from '@/lib/accounts/getAccounts';
import FeedbackError from '@/components/utils/feedbacks/FeedbackError';
import AccountHeader from '../../components/AccountHeader';
import TabsPage from '../../components/TabsPage';
import DriversMenu from '../components/DriversMenu';

type DataType = {
  params: {
    id: string;
  };
};

export default async function accountsPage({ params }: DataType) {
  return (
    <>
      {/* <TabsPage current="drivers" account_id={accountId} /> */}

      <div className="px-4 py-6 border rounded-b-md">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
          <div className="col-span-3">
            {/* <DriversMenu current="list" account_id={accountId} /> */}
          </div>
          <div className="col-span-9"></div>
        </div>
      </div>
    </>
  );
}
