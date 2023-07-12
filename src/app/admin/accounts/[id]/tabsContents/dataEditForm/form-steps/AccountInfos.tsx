import FormTitle from '@/components/forms/FormTitle';
import FeedbackError from '@/components/utils/feedbacks/FeedbackError';
import CpfMaskedInput from '../maskedInputs/CpfMaskedInput';
import { isValidEmail } from '@/lib/utils/utils';
import TelephoneMaskedInput from '../maskedInputs/TelephoneMaskedInput';
import { Account_Address } from 'AccountsTypes';

type DataProps = {
  errors: any;
  register: any;
  setValue: any;
  saveError: any;
  account: Account_Address;
};

export default function AccountInfos({
  errors,
  register,
  setValue,
  account,
  saveError,
}: DataProps) {
  return (
    <div className="border rounded-md p-4">
      {/* {saveError.length > 0 && <FeedbackError text={saveError} />} */}

      <div className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-6">
        <div className="mb-2 sm:col-span-6">
          <FormTitle content="Edição de Dados da Conta" />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium leading-6 text-gray-900">
            Nome da Conta<sup className="text-red-700">*</sup>
          </label>
          <div className="mt-1">
            <input
              {...register('account_name', {
                required: 'Nome obrigatório',
                validate: (value: string) => {
                  if (value.split(' ').length < 2) {
                    return 'Digite o nome completo';
                  }
                  return true;
                },
              })}
              type="text"
              name="account_name"
              id="account_name"
              placeholder="João da Silva"
              className="block bg-white w-full text-sm p-2 border rounded-md focus:outline-0 text-rede-gray-300 placeholder:text-rede-gray-500 placeholder:text-sm"
            />
          </div>
          {errors?.account_name && (
            <p className=" text-red-700 text-xs mt-1">
              {errors.account_name.message}
            </p>
          )}
        </div>

        <div className="sm:col-span-2">
          <CpfMaskedInput
            setValue={setValue}
            name="account_cpf_cnpj"
            register={register}
            errors={errors}
            value={account.account_cpf_cnpj}
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium leading-6 text-gray-900">
            Email
          </label>
          <div className="mt-1">
            <input
              {...register('account_email', {
                required: 'E-mail obrigatório',
                validate: (value: string) => {
                  if (value.length == 0 || isValidEmail(value)) {
                    return true;
                  } else {
                    return 'Insira um email válido!';
                  }
                },
              })}
              type="text"
              name="account_email"
              id="account_email"
              placeholder="motorista@redefrete.com.br"
              className="block bg-white w-full text-sm p-2 border rounded-md focus:outline-0 text-rede-gray-300 placeholder:text-rede-gray-500 placeholder:text-sm"
            />
            {errors?.account_email && (
              <p className=" text-red-700 text-xs mt-1">
                {errors.account_email.message}
              </p>
            )}
          </div>
        </div>
        <div>
          <TelephoneMaskedInput
            setValue={setValue}
            name="account_telephone"
            register={register}
            errors={errors}
            title="Telefone"
            value={account.account_telephone}
          />
        </div>
        <div>
          <TelephoneMaskedInput
            setValue={setValue}
            name="account_whatsapp"
            register={register}
            errors={errors}
            title="Whatsapp"
            value={account.account_whatsapp}
          />
        </div>
      </div>
    </div>
  );
}
