import CepMaskedInput from './maskedInputs/CepMaskedInput';
import { brazilStates } from '@/lib/utils/utilsConstants';
import { useState } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

type DataProps = {
  errors: any;
  register: any;
  setValue: any;
};

export default function DriverAddress({
  errors,
  register,
  setValue,
}: DataProps) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <div className="border rounded-md p-4">
        <div className="mb-6 flex items-center">
          <h2 className="font-semibold text-gray-800 text-xl underline-offset-8 underline mr-4">
            Endereço do Motorista{' '}
          </h2>
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
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Logradouro<sup className="text-red-700">*</sup>
            </label>
            <div className="mt-1">
              <input
                readOnly={isLoading}
                {...register('address_street', {
                  required: 'Logradouro é obrigatório',
                })}
                type="text"
                name="address_street"
                id="address_street"
                placeholder="Rua Um Dois Três"
                className="block bg-white w-full text-sm p-2 border rounded-md focus:outline-0 text-rede-gray-300 placeholder:text-rede-gray-500 placeholder:text-sm"
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
                readOnly={isLoading}
                {...register('address_number', {
                  required: 'Número é obrigatório',
                })}
                type="text"
                name="address_number"
                id="address_number"
                placeholder="20"
                className="block bg-white w-full text-sm p-2 border rounded-md focus:outline-0 text-rede-gray-300 placeholder:text-rede-gray-500 placeholder:text-sm"
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
                readOnly={isLoading}
                {...register('address_complement')}
                type="text"
                name="address_complement"
                id="address_complement"
                placeholder="casa 1"
                className="block bg-white w-full text-sm p-2 border rounded-md focus:outline-0 text-rede-gray-300 placeholder:text-rede-gray-500 placeholder:text-sm"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Cidade<sup className="text-red-700">*</sup>
            </label>
            <div className="mt-1">
              <input
                readOnly={isLoading}
                {...register('address_city', {
                  required: 'Logradouro é obrigatório',
                })}
                type="text"
                name="address_city"
                id="address_city"
                placeholder="Rua Um Dois Três"
                className="block bg-white w-full text-sm p-2 border rounded-md focus:outline-0 text-rede-gray-300 placeholder:text-rede-gray-500 placeholder:text-sm"
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
                readOnly={isLoading}
                {...register('address_state', {
                  required: 'Estado é obrigatório',
                })}
                name="address_state"
                id="address_state"
                className="block bg-white w-full text-sm p-2 border rounded-md focus:outline-0 text-rede-gray-300 placeholder:text-rede-gray-500 placeholder:text-sm"
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
