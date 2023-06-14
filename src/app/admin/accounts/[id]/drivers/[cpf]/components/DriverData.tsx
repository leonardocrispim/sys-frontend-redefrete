import TagStatus from '@/components/drivers/TagStatus';
import PageTitle from '@/components/utils/PageTitle';
import {
  driversStatusGR,
  driversStatusGRKeys,
  driversStatusRF,
  driversStatusRFKeys,
} from '@/lib/utils/driversConstants';
import { formatCPFCNPJ, formatPhone } from '@/lib/utils/utils';
import { Driver } from 'DriversTypes';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { FaUserEdit } from 'react-icons/fa';

type DataType = {
  driver: Driver;
};

export default function DriverData({ driver }: DataType) {
  const isLoading = false;
  return (
    <>
      <div className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-4 mb-5">
        <div className="sm:col-span-2 flex items-center">
          <PageTitle>Dados do Motorista</PageTitle>
        </div>
        <div className="flex items-center">
          <div className="w-full">
            <div className="text-xs mb-1 text-center font-medium text-rede-gray-400">
              Gerenciadora de Risco
            </div>
            <TagStatus status={driver.driver_status_gr}>
              {driversStatusGR[driver.driver_status_gr as driversStatusGRKeys]}
            </TagStatus>
          </div>
        </div>
        <div className="flex items-center">
          <div className="w-full">
            <div className="text-xs mb-1 text-center font-medium text-rede-gray-400">
              Redefrete
            </div>
            <TagStatus status={driver.driver_status}>
              {driversStatusRF[driver.driver_status as driversStatusRFKeys]}
            </TagStatus>
          </div>
        </div>
      </div>

      <div className="border rounded-md p-4 mb-2">
        <div className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-6">
          <div className="sm:col-span-2">
            <div className="text-xs font-medium text-rede-gray-400">Nome</div>
            <div className="text-md font-medium  text-rede-gray-200">
              {driver.driver_name}
            </div>
          </div>
          <div>
            <div className="text-xs font-medium text-rede-gray-400">
              CPF/CNPJ
            </div>
            <div className="text-md font-medium  text-rede-gray-200">
              {formatCPFCNPJ(driver.driver_cpf_cnpj)}
            </div>
          </div>
          <div>
            <div className="text-xs font-medium text-rede-gray-400">
              Telefone
            </div>
            <div className="text-md font-medium  text-rede-gray-200">
              {driver.driver_telephone && formatPhone(driver.driver_telephone)}
            </div>
          </div>
          <div>
            <div className="text-xs font-medium text-rede-gray-400">Email</div>
            <div className="text-md font-medium  text-rede-gray-200">
              {driver.driver_email && formatPhone(driver.driver_email)}
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <button
          type="button"
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
