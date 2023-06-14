import { formatPhone, shortName, formatCPFCNPJ } from '@utils/utils';
import { Account } from 'AccountsTypes';

type DataProps = {
  account?: Account | any;
};

export default function AccountItemList({ account }: DataProps) {
  return (
    <div className="flex items-center">
      <div className="ml-4">
        <>
          <div className="font-medium text-rede-gray-100">
            {shortName(account?.account_name)}
          </div>
          <div className="text-sm text-rede-gray-300">
            {formatCPFCNPJ(account.account_cpf_cnpj)}
          </div>
          <div className="text-xs text-rede-gray-500">
            {account.account_telephone &&
              formatPhone(account.account_telephone)}
          </div>
        </>
      </div>
    </div>
  );
}
