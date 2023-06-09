import { formatPhone, shortName, formatCPFCNPJ } from '@utils/utils';
import { Registration } from 'RegistrationsTypes';

type DataProps = {
  registration?: Registration | any;
};

export default function DriverItemList({ registration }: DataProps) {
  return (
    <div className="flex items-center">
      {/* <div className="h-11 w-11 flex-shrink-0">
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
      </div> */}
      <div className="ml-4">
        <>
          <div className="font-medium text-rede-gray-100">
            {shortName(registration?.driver_name)}
          </div>
          <div className="text-sm text-rede-gray-300">
            {formatCPFCNPJ(registration.driver_cpf_cnpj)}
          </div>
          <div className="text-xs text-rede-gray-500">
            {registration.driver_telephone &&
              formatPhone(registration.driver_telephone)}
          </div>
        </>
      </div>
    </div>
  );
}
