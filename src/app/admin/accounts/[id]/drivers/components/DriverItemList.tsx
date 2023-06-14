import { formatPhone, shortName, formatCPFCNPJ } from '@utils/utils';

import Image from 'next/image';

import { Driver } from 'DriversTypes';

type DataProps = {
  driver?: Driver | any;
};

export default function DriverItemList({ driver }: DataProps) {
  return (
    <div className="flex items-center">
      <div className="h-11 w-11 flex-shrink-0">
        <Image
          className="h-11 w-11 rounded-full"
          src={
            driver?.driver_photo
              ? `/drivers/${driver.driver_cpf_cnpj}/${driver.driver_photo}`
              : `/images/tmp-driver.png`
          }
          width={512}
          height={512}
          alt=""
        />
      </div>
      <div className="ml-4">
        {driver?.driver_id ? (
          <>
            <div className="font-medium text-rede-gray-100">
              {shortName(driver?.driver_name)}
            </div>
            <div className="text-sm text-rede-gray-300">
              {formatCPFCNPJ(driver.driver_cpf_cnpj)}
            </div>
            <div className="text-xs text-rede-gray-500">
              {driver.driver_telephone && formatPhone(driver.driver_telephone)}
            </div>
          </>
        ) : (
          <div className="font-medium text-rede-red-400/80">NÃO VINCULADO</div>
        )}
      </div>
    </div>
  );
}
