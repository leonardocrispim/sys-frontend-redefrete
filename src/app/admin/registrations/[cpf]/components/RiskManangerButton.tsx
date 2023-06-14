import {
  formatCPFCNPJ,
  formatPhone,
  formatPlate,
  formatZipCode,
} from '@/lib/utils/utils';
import { brazilStates, brazilStatesKeys } from '@/lib/utils/utilsConstants';
import { Registration } from 'RegistrationsTypes';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { BsFillSendExclamationFill } from 'react-icons/bs';
import { FaUserEdit } from 'react-icons/fa';

type DataType = {
  // registration: Registration;
};

export default function RiskManangerButton({}: DataType) {
  const isLoading = false;

  return (
    <>
      <div className="">
        <button
          type="button"
          disabled={isLoading}
          className={
            `inline-flex justify-center rounded-lg text-sm font-semibold py-2 px-8 text-white hover:bg-rede-blue-400 dark:bg-gray-200 dark:hover:bg-white dark:text-slate-900  ` +
            (isLoading ? ' bg-rede-gray-400' : ' bg-rede-blue')
          }
        >
          {isLoading ? (
            <AiOutlineLoading3Quarters className=" -ml-1 mr-2 h-5 w-5 text-white dark:text-slate-900 animate-spin " />
          ) : (
            <BsFillSendExclamationFill className=" -ml-1 mr-2 h-5 w-5 text-white dark:text-slate-900" />
          )}
          <span>ANALISAR RISCO</span>
        </button>
      </div>
    </>
  );
}
