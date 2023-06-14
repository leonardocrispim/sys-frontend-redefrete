import TagStatus from '@/components/drivers/TagStatus';
import PageTitle from '@/components/utils/PageTitle';
import {
  driversStatusGR,
  driversStatusGRKeys,
  driversStatusRF,
  driversStatusRFKeys,
} from '@/lib/utils/driversConstants';
import { timestampToBR } from '@/lib/utils/utils';
import { Account } from 'AccountsTypes';

type PropsType = {
  account: Account;
};

export default function AccountHeader({ account }: PropsType) {
  return (
    <div className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-4 mb-5 border-b pb-4">
      <div className="sm:col-span-3">
        <PageTitle>Dados da Conta</PageTitle>
        <p className="text-rede-gray-200">
          <span className="font-bold">Data:</span>{' '}
          {timestampToBR(account.created_at as string)}
        </p>
      </div>

      <div className="flex items-center">
        <div className="w-full">
          <div className="text-xs mb-1 text-center font-medium text-rede-gray-400">
            Status
          </div>
          <TagStatus status={account.account_status as string}>
            {driversStatusRF[account.account_status as driversStatusRFKeys]}
          </TagStatus>
        </div>
      </div>
    </div>
  );
}
