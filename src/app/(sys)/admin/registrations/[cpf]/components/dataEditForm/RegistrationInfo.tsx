import {
  formatCPFCNPJ,
  formatPhone,
  formatPlate,
  formatZipCode,
} from '@/lib/utils/utils';
import { brazilStates, brazilStatesKeys } from '@/lib/utils/utilsConstants';
import { Registration } from 'RegistrationsTypes';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { FaUserEdit } from 'react-icons/fa';

type DataType = {
  registration: Registration;
  setTab: React.Dispatch<React.SetStateAction<'data' | 'edit'>>;
};

export default function RegistrationInfo({ registration, setTab }: DataType) {
  const isLoading = false;

  return (
    <>
      <div className="border rounded-md p-4 mb-6 bg-white">
        <div className="mb-6">
          <h2 className="font-semibold text-gray-800 text-xl underline-offset-8 underline">
            Dados do Motorista
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-6">
          <div className="sm:col-span-2">
            <div className="text-xs font-medium text-rede-gray-400">Nome</div>
            <div className="text-sm font-medium  text-rede-gray-200">
              {registration.driver_name}
            </div>
          </div>
          <div>
            <div className="text-xs font-medium text-rede-gray-400">
              CPF/CNPJ
            </div>
            <div className="text-sm font-medium  text-rede-gray-200">
              {formatCPFCNPJ(registration.driver_cpf_cnpj)}
            </div>
          </div>
          <div>
            <div className="text-xs font-medium text-rede-gray-400">
              Telefone
            </div>
            <div className="text-sm font-medium  text-rede-gray-200">
              {registration.driver_telephone &&
                formatPhone(registration.driver_telephone)}
            </div>
          </div>
          <div>
            <div className="text-xs font-medium text-rede-gray-400">Email</div>
            <div className="text-sm font-medium  text-rede-gray-200">
              {registration.driver_email &&
                formatPhone(registration.driver_email)}
            </div>
          </div>
        </div>
      </div>

      <div className="border rounded-md p-4 mb-6  bg-white">
        <div className="mb-6">
          <h2 className="font-semibold text-gray-800 text-xl underline-offset-8 underline">
            Endereço do Motorista
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-6">
          <div>
            <div className="text-xs font-medium text-rede-gray-400">CEP</div>
            <div className="text-sm font-medium  text-rede-gray-200">
              {formatZipCode(registration.address_zip_code)}
            </div>
          </div>
          <div className="sm:col-span-2">
            <div className="text-xs font-medium text-rede-gray-400">
              Logradouro
            </div>
            <div className="text-sm font-medium  text-rede-gray-200">
              {registration.address_street}
            </div>
          </div>
          <div>
            <div className="text-xs font-medium text-rede-gray-400">Número</div>
            <div className="text-sm font-medium  text-rede-gray-200">
              {registration.address_number}
            </div>
          </div>

          <div className="sm:col-span-2">
            <div className="text-xs font-medium text-rede-gray-400">
              Complemento
            </div>
            <div className="text-sm font-medium  text-rede-gray-200">
              {registration.address_complement}
            </div>
          </div>

          <div className="sm:col-span-2">
            <div className="text-xs font-medium text-rede-gray-400">Bairro</div>
            <div className="text-sm font-medium  text-rede-gray-200">
              {registration.address_district}
            </div>
          </div>

          <div className="sm:col-span-2">
            <div className="text-xs font-medium text-rede-gray-400">Cidade</div>
            <div className="text-sm font-medium  text-rede-gray-200">
              {registration.address_city}
            </div>
          </div>

          <div>
            <div className="text-xs font-medium text-rede-gray-400">Estado</div>
            <div className="text-sm font-medium  text-rede-gray-200">
              {brazilStates[registration.address_state as brazilStatesKeys]}
            </div>
          </div>
        </div>
      </div>

      <div className="border rounded-md p-4 mb-6  bg-white">
        <div className="mb-6">
          <h2 className="font-semibold text-gray-800 text-xl underline-offset-8 underline">
            Dados do Veículo
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-6">
          <div>
            <div className="text-xs font-medium text-rede-gray-400">Placa</div>
            <div className="text-sm font-medium  text-rede-gray-200">
              {formatPlate(registration.vehicle_license_plate)}
            </div>
          </div>
          <div className="sm:col-span-2">
            <div className="text-xs font-medium text-rede-gray-400">
              Tipo de Veículo
            </div>
            <div className="text-sm font-medium  text-rede-gray-200">
              {registration.vehicle_type}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => setTab('edit')}
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
