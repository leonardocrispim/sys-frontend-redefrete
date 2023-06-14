import { isValidEmail } from '@/lib/utils/utils';
import CpfMaskedInput from './maskedInputs/CpfMaskedInput';
import TelephoneMaskedInput from './maskedInputs/TelephoneMaskedInput';

type DataProps = {
  errors: any;
  register: any;
  setValue: any;
};

export default function DriverData({ errors, register, setValue }: DataProps) {
  return (
    <>
      <div className="border rounded-md p-4">
        <div className="mb-6">
          <h2 className="font-semibold text-gray-800 text-xl underline-offset-8 underline">
            Dados do Motorista
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-6">
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Nome Completo<sup className="text-red-700">*</sup>
            </label>
            <div className="mt-1">
              <input
                {...register('driver_name', {
                  required: 'Nome obrigatório',
                  validate: (value: string) => {
                    if (value.split(' ').length < 2) {
                      return 'Digite o nome completo';
                    }
                    return true;
                  },
                })}
                type="text"
                name="driver_name"
                id="driver_name"
                placeholder="João da Silva"
                className="block bg-white w-full text-sm p-2 border rounded-md focus:outline-0 text-rede-gray-300 placeholder:text-rede-gray-500 placeholder:text-sm"
              />
            </div>
            {errors?.driver_name && (
              <p className=" text-red-700 text-xs mt-1">
                {errors.driver_name.message}
              </p>
            )}
          </div>

          <div>
            <CpfMaskedInput
              setValue={setValue}
              name="driver_cpf_cnpj"
              register={register}
              errors={errors}
            />
          </div>
          <div>
            <TelephoneMaskedInput
              setValue={setValue}
              name="driver_telephone"
              register={register}
              errors={errors}
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Email
            </label>
            <div className="mt-1">
              <input
                {...register('driver_email', {
                  validate: (value: string) => {
                    if (value.length == 0 || isValidEmail(value)) {
                      return true;
                    } else {
                      return 'Insira um email válido!';
                    }
                  },
                })}
                type="text"
                name="driver_email"
                id="driver_email"
                placeholder="motorista@redefrete.com.br"
                className="block bg-white w-full text-sm p-2 border rounded-md focus:outline-0 text-rede-gray-300 placeholder:text-rede-gray-500 placeholder:text-sm"
              />
              {errors?.driver_email && (
                <p className=" text-red-700 text-xs mt-1">
                  {errors.driver_email.message}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
