import FormTitle from '@/components/forms/FormTitle';
import CepMaskedInput from '../maskedInputs/CepMaskedInput';
import { brazilStates } from '@/lib/utils/utilsConstants';
import { Account, Account_Address } from 'AccountsTypes';
import { useState } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

type DataProps = {
  errors: any;
  register: any;
  setValue: any;
  handleCheckAddress?: any;
  checkBoxAddressRef?: any;
  isCheckedAddress?: boolean;
  account?: Account_Address | null | undefined;
};

export default function AddressForm({
  errors,
  register,
  setValue,
  handleCheckAddress,
  checkBoxAddressRef,
  isCheckedAddress,
  account
}: DataProps) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <div className="border rounded-md p-4 mt-4">
        
        {
          account?.rd_account_meta.address_zip_code ? (
            <div className="sm:col-span-4 flex border-b mb-2 pb-2">
              <div className="mt-1">
                <input
                  type='checkbox'
                  className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                  onClick={handleCheckAddress}
                  ref={checkBoxAddressRef}
                >
                </input>
              </div>

              <label className="block text-sm font-medium leading-6 text-gray-900 ml-2 mt-[3px]">
                Preencher com os dados da conta
              </label>
            </div>
          ) : (
            <></>
          )
        }
        
        <div className="mb-6 flex items-center">
          <FormTitle content={isCheckedAddress == true || isCheckedAddress == false ? 'Endereço do Motorista' : 'Endereço da Conta'} />
          {isLoading && (
            <AiOutlineLoading3Quarters className=" -ml-1 mr-2 h-5 w-5 text-dark dark:text-slate-900 animate-spin " />
          )}
        </div>

        <div className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-6">
          <div>
            <CepMaskedInput
              setValue={setValue}
              name="address_zip_code"
              register={register}
              errors={errors}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              isCheckedAddress={isCheckedAddress}
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Logradouro<sup className="text-red-700">*</sup>
            </label>
            <div className="mt-1">
              <input
                {...register('address_street')}
                readOnly={isLoading || isCheckedAddress}
                type="text"
                name="address_street"
                id="address_street"
                placeholder="Rua Um Dois Três"
                className={`block w-full text-sm p-2 border rounded-md focus:outline-0 text-rede-gray-300 placeholder:text-rede-gray-500 placeholder:text-sm ${isCheckedAddress ? ` bg-rede-gray-600` : `bg-white`}`} 
              />
            </div>
            {errors?.address_street && (
              <p className=" text-red-700 text-xs mt-1">
                {errors.address_street.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Número<sup className="text-red-700">*</sup>
            </label>
            <div className="mt-1">
              <input
                {...register('address_number')}
                readOnly={isLoading || isCheckedAddress}
                type="text"
                name="address_number"
                id="address_number"
                placeholder="20"
                className={`block w-full text-sm p-2 border rounded-md focus:outline-0 text-rede-gray-300 placeholder:text-rede-gray-500 placeholder:text-sm ${isCheckedAddress ? ` bg-rede-gray-600` : `bg-white`}`} 
              />
            </div>
            {errors?.address_number && (
              <p className=" text-red-700 text-xs mt-1">
                {errors.address_number.message}
              </p>
            )}
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Complemento
            </label>
            <div className="mt-1">
              <input
                {...register('address_complement')}
                readOnly={isLoading || isCheckedAddress}
                type="text"
                name="address_complement"
                id="address_complement"
                placeholder="casa 1"
                className={`block w-full text-sm p-2 border rounded-md focus:outline-0 text-rede-gray-300 placeholder:text-rede-gray-500 placeholder:text-sm ${isCheckedAddress ? ` bg-rede-gray-600` : `bg-white`}`} 
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Cidade<sup className="text-red-700">*</sup>
            </label>
            <div className="mt-1">
              <input
                {...register('address_city')}
                readOnly={isLoading || isCheckedAddress}
                type="text"
                name="address_city"
                id="address_city"
                placeholder="Rua Um Dois Três"
                className={`block w-full text-sm p-2 border rounded-md focus:outline-0 text-rede-gray-300 placeholder:text-rede-gray-500 placeholder:text-sm ${isCheckedAddress ? ` bg-rede-gray-600` : `bg-white`}`} 
              />
            </div>
            {errors?.address_city && (
              <p className=" text-red-700 text-xs mt-1">
                {errors.address_city.message}
              </p>
            )}
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Estado<sup className="text-red-700">*</sup>
            </label>
            <div className="mt-1">
              <select
                {...register('address_state')}
                readOnly={isLoading || isCheckedAddress}
                name="address_state"
                id="address_state"
                className={`block w-full text-sm p-2 border rounded-md focus:outline-0 text-rede-gray-300 placeholder:text-rede-gray-500 placeholder:text-sm ${isCheckedAddress ? ` bg-rede-gray-600` : `bg-white`}`} 
              >
                <option value="">Selecione</option>
                {Object.entries(brazilStates).map(([uf, state]) => (
                  <option key={uf} value={uf}>
                    {state}
                  </option>
                ))}
              </select>
            </div>
            {errors?.address_state && (
              <p className=" text-red-700 text-xs mt-1">
                {errors.address_state.message}
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
