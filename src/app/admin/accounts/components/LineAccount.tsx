import TagStatus from '@/components/drivers/TagStatus';
import { AiFillEye } from 'react-icons/ai';
import Link from 'next/link';
import {
  driversStatusRF,
  driversStatusRFKeys,
} from '@/lib/utils/driversConstants';
import AccountItemList from './AccountItemList';
import { Account } from 'AccountsTypes';

type DataProps = {
  account: Account;
};

export default function LineAccount({ account }: DataProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-6 gap-2 mb-2 border rounded-md p-2">
      <div className="sm:col-span-4 flex items-center">
        <AccountItemList account={account} />
      </div>

      <div className="flex items-center">
        <div className="">
          <p className="text-xs text-center font-bold mb-1">Status</p>

          <TagStatus status={account.account_status as string}>
            {driversStatusRF[account.account_status as driversStatusRFKeys]}
          </TagStatus>
        </div>
      </div>

      <div className="flex items-center justify-end">
        <Link
          href={`/admin/accounts/${account.account_id}`}
          title="Acessar conta"
          className="rounded-md mr-1 bg-rede-blue-300 p-2 text-white shadow-sm hover:bg-rede-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          <AiFillEye className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
