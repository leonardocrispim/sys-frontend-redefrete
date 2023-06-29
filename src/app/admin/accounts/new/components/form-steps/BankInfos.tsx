import FormTitle from "@/components/forms/FormTitle"
import { banks } from "@/lib/utils/utilsBanks"

type DataProps = {
    register: any
    errors: any
    handleBankAgencyInput: any
    handleBankAccountInput: any
}

export default function BankInfos({ 
    register, 
    errors,
    handleBankAgencyInput,
    handleBankAccountInput
}: DataProps) {
    return (
        <div className=" mt-6 border rounded-md p-4">
            <div className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-6">
                <div className="mb-2 sm:col-span-6">
                    <FormTitle content='Dados Bancários' />
                </div>
                <div className="sm:col-span-2">
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                    Selecione o Banco
                    </label>
                    <div className="mt-1">
                    <select
                        {...register('account_bank_number')}
                        className="block bg-white w-full text-sm p-2 border rounded-md focus:outline-0 text-rede-gray-300 placeholder:text-rede-gray-500 placeholder:text-sm"
                        name="account_bank_number"
                        id="account_bank_number"
                    >
                        <>
                        {banks.map((bank) => {
                            return (
                            <option value={bank.bankNumber} key={bank.bankName}>
                                {bank.bankName}
                            </option>
                            );
                        })}
                        </>
                    </select>
                    {errors?.account_name && (
                        <p className=" text-red-700 text-xs mt-1">
                        {errors.account_bank_number?.message}
                        </p>
                    )}
                    </div>
                </div>

                <div className="sm:col-span-2">
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                    Agência bancária
                    </label>
                    <div className="mt-1">
                    <input
                        {...register('account_bank_agency')}
                        className="block bg-white w-full text-sm p-2 border rounded-md focus:outline-0 text-rede-gray-300 placeholder:text-rede-gray-500 placeholder:text-sm"
                        name="account_bank_agency"
                        id="account_bank_agency"
                        type="text"
                        placeholder="0000"
                        onInput={handleBankAgencyInput}
                    ></input>
                    {errors.account_bank_agency && (
                        <p className=" text-red-700 text-xs mt-1">
                        {errors.account_bank_agency.message}
                        </p>
                    )}
                    </div>
                </div>

                <div className="sm:col-span-2">
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                    Conta Bancária
                    </label>
                    <div className="mt-1">
                    <input
                        {...register('account_bank_account')}
                        className="block bg-white w-full text-sm p-2 border rounded-md focus:outline-0 text-rede-gray-300 placeholder:text-rede-gray-500 placeholder:text-sm"
                        name="account_bank_account"
                        id="account_bank_account"
                        type="text"
                        placeholder="00000000-0"
                        onInput={handleBankAccountInput}
                    ></input>
                    {errors.account_bank_account && (
                        <p className=" text-red-700 text-xs mt-1">
                        {errors.account_bank_account.message}
                        </p>
                    )}
                    </div>
                </div>
            </div>
        </div>
    )
}