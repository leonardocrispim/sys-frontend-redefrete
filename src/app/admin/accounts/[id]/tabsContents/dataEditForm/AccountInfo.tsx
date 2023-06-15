import FeedbackSuccess from '@/components/utils/feedbacks/FeedbackSuccess';
import { formatCPFCNPJ, formatPhone } from '@/lib/utils/utils';
import { Account } from 'AccountsTypes';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { FaUserEdit } from 'react-icons/fa';

type DataType = {
  account: Account;
  isSaved: boolean;
  setTab: React.Dispatch<React.SetStateAction<'data' | 'edit'>>;
  setIsSaved: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function AccountInfo({
  account,
  setTab,
  isSaved,
  setIsSaved,
}: DataType) {
  const isLoading = false;

  return (
    <>
      {isSaved && <FeedbackSuccess text="Dados salvos com sucesso!" />}

      <div className="border rounded-md p-4 mb-6 bg-white">
        <div className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-6">
          <div className="sm:col-span-2">
            <div className="text-xs font-medium text-rede-gray-400">Nome</div>
            <div className="text-sm font-medium  text-rede-gray-200">
              {account.account_name}
            </div>
          </div>
          <div className="col-span-2">
            <div className="text-xs font-medium text-rede-gray-400">
              CPF/CNPJ
            </div>
            <div className="text-sm font-medium  text-rede-gray-200">
              {formatCPFCNPJ(account.account_cpf_cnpj as string)}
            </div>
          </div>
          <div className="col-span-2">
            <div className="text-xs font-medium text-rede-gray-400">Email</div>
            <div className="text-sm font-medium  text-rede-gray-200">
              {account.account_email && formatPhone(account.account_email)}
            </div>
          </div>
          <div>
            <div className="text-xs font-medium text-rede-gray-400">
              Telefone
            </div>
            <div className="text-sm font-medium  text-rede-gray-200">
              {account.account_telephone &&
                formatPhone(account.account_telephone)}
            </div>
          </div>

          {account.account_whatsapp && (
            <div>
              <div className="text-xs font-medium text-rede-gray-400">
                Whatsapp
              </div>
              <div className="text-sm font-medium  text-rede-gray-200">
                {formatPhone(account.account_whatsapp)}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => {
            setTab('edit');
            setIsSaved(false);
          }}
          disabled={isLoading}
          className={
            `inline-flex justify-center rounded-lg text-sm font-semibold py-2 px-6 text-white hover:bg-rede-yellow dark:bg-gray-200 dark:hover:bg-white dark:text-slate-900 ` +
            (isLoading ? ' bg-rede-gray-400' : ' bg-rede-yellow-700')
          }
        >
          {isLoading ? (
            <AiOutlineLoading3Quarters className=" -ml-1 mr-2 h-5 w-5 text-white dark:text-slate-900 animate-spin " />
          ) : (
            <FaUserEdit className=" -ml-1 mr-2 h-5 w-5 text-white dark:text-slate-900" />
          )}
          <span>EDITAR</span>
        </button>
      </div>
    </>
  );
}
