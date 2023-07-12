import FormTitle from '@/components/forms/FormTitle';
import CnhMaskedInput from '../maskedInputs/CnhMaskedInput';
import DateMaskedInput from '../maskedInputs/DataMaskedInput';
import { brazilStates } from '@/lib/utils/utilsConstants';
import CnhCodeMaskedInput from '../maskedInputs/CnhCodeMaskedInput';
import { cnhCategories } from '@/lib/utils/utilsCnhCategories';
import { Driver } from 'DriversTypes';
import formatDate from '@/lib/utils/formatDate';

type DataProps = {
  register: any;
  setValue: any;
  errors: any;
  driver?: Driver;
};

export default function DriverCnh({
  register,
  setValue,
  errors,
  driver,
}: DataProps) {
  return (
    <div className="border rounded-md p-4 mt-4">
      <div className="mb-6 flex items-center">
        <FormTitle content="Dados da CNH" />
      </div>

      <div className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-6">
        <div className="sm:col-span-2">
          <CnhMaskedInput
            register={register}
            errors={errors}
            name="driver_cnh_number"
            value={driver?.rd_driver_meta.driver_cnh_number}
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium leading-6 text-gray-900">
            Estado de Expedição
          </label>
          <div className="mt-1">
            <select
              {...register('driver_cnh_uf')}
              name="driver_cnh_uf"
              id="driver_cnh_uf"
              defaultValue={driver?.rd_driver_meta.driver_cnh_uf}
              className={`block w-full text-sm p-2 border rounded-md focus:outline-0 text-rede-gray-300 placeholder:text-rede-gray-500 placeholder:text-sm bg-white`}
            >
              <option value="">Selecione</option>
              {Object.entries(brazilStates).map(([uf, state]) => (
                <option key={uf} value={uf}>
                  {state}
                </option>
              ))}
            </select>
          </div>
          {errors?.driver_cnh_uf && (
            <p className=" text-red-700 text-xs mt-1">
              {errors.driver_cnh_uf.message}
            </p>
          )}
        </div>

        <div>
          <DateMaskedInput
            register={register}
            errors={errors}
            name="driver_cnh_first_license"
            setValue={setValue}
            labelTitle="1 Habilitação"
            value={
              driver?.rd_driver_meta.driver_cnh_first_license
                ? formatDate(driver.rd_driver_meta.driver_cnh_first_license)
                : ''
            }
          />
        </div>

        <div>
          <DateMaskedInput
            register={register}
            errors={errors}
            name="driver_cnh_validate"
            setValue={setValue}
            labelTitle="Vencimento"
            value={
              driver?.rd_driver_meta.driver_cnh_validate
                ? formatDate(driver?.rd_driver_meta.driver_cnh_validate)
                : ''
            }
          />
        </div>

        <div className="sm:col-span-2">
          <CnhCodeMaskedInput
            register={register}
            errors={errors}
            name="driver_cnh_safety_code"
            value={driver?.rd_driver_meta.driver_cnh_safety_code}
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium leading-6 text-gray-900">
            Categoria da CNH
          </label>
          <div className="mt-1">
            <select
              {...register('driver_cnh_category')}
              name="driver_cnh_category"
              id="driver_cnh_category"
              defaultValue={driver?.rd_driver_meta.driver_cnh_category}
              className={`block w-full text-sm p-2 border rounded-md focus:outline-0 text-rede-gray-300 placeholder:text-rede-gray-500 placeholder:text-sm bg-white`}
            >
              <option value="">Selecione</option>
              {Object.entries(cnhCategories).map(([value, category]) => (
                <option key={value} value={value}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          {errors?.driver_cnh_category && (
            <p className=" text-red-700 text-xs mt-1">
              {errors.driver_cnh_category.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
