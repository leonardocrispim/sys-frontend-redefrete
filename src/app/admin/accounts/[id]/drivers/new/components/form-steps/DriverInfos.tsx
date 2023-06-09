import FeedbackError from "@/components/utils/feedbacks/FeedbackError";
import CpfMaskedInput from "../maskedInputs/CpfMaskedInput";
import { DriverContact } from "./DriverContact";
import RgMaskedInput from "../maskedInputs/RgMaskedInput";
import { brazilStates } from "@/lib/utils/utilsConstants";
import DateMaskedInput from "../maskedInputs/DataMaskedInput";

export type DataProps = {
    errors: any;
    register: any;
    setValue: any;
    isChecked: boolean;
    checkBoxRef: any;
    handleCheck: any;
    saveError: any
}

export function DriverInfo({
    errors,
    register,
    setValue,
    isChecked,
    checkBoxRef,
    handleCheck,
    saveError
}: DataProps) {
    return (
        <>
            <div className="border rounded-md p-4">
                <div className="sm:col-span-4 flex border-b mb-2 pb-2">
                    <div className="mt-1">
                    <input
                        type='checkbox'
                        className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                        onClick={handleCheck}
                        ref={checkBoxRef}
                    >
                    </input>
                    </div>

                    <label className="block text-sm font-medium leading-6 text-gray-900 ml-2 mt-[3px]">
                    Preencher com os dados da conta
                    </label>
                </div>
                {saveError.length > 0 && <FeedbackError text={saveError} />}

                <div className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-4">
                    <div className="mb-2 sm:col-span-6">
                        <h2 className="font-semibold text-gray-800 text-lg underline-offset-8 underline">
                        Dados do Motorista
                        </h2>
                    </div>
                    <div className="sm:col-span-3">
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
                            readOnly={isChecked}
                            type="text"
                            name="driver_name"
                            id="driver_name"
                            placeholder="João da Silva"
                            className={`block w-full text-sm p-2 border rounded-md focus:outline-0 text-rede-gray-300 placeholder:text-rede-gray-500 placeholder:text-sm ${isChecked ? ` bg-rede-gray-600` : `bg-white`}`} 
                        />
                        </div>
                        {errors?.driver_name && (
                        <p className=" text-red-700 text-xs mt-1">
                            {errors.driver_name.message}
                        </p>
                        )}
                    </div>

                    <div className="sm:col-span-3">
                        <CpfMaskedInput
                            setValue={setValue}
                            name="driver_cpf_cnpj"
                            register={register}
                            errors={errors}
                            isChecked={isChecked}
                        />
                    </div>

                    <div className="sm:col-span-3">
                        <DateMaskedInput
                            register={register}
                            name='driver_birth_date'
                            errors={errors}
                            setValue={setValue}
                            labelTitle="Data de Nascimento" 
                        />
                    </div>

                    <div className="sm:col-span-3">
                        <label className="block text-sm font-medium leading-6 text-gray-900">
                            Sexo
                        </label>
                        <div className="mt-1">
                            <select
                                {...register('driver_sex')}
                                name="driver_sex"
                                id="driver_sex"
                                className={`block w-full text-sm p-2 border rounded-md focus:outline-0 text-rede-gray-300 placeholder:text-rede-gray-500 placeholder:text-sm bg-white`} 
                            >
                                <option value="">Selecione</option>
                                <option value="Masculino">Masculino</option>
                                <option value="Feminino">Feminino</option>
                            </select>
                        </div>
                    </div>

                    <div className="sm:col-span-2">
                        <RgMaskedInput 
                            name="driver_rg"
                            register={register}
                            errors={errors}
                        />
                    </div>

                    <div className="sm:col-span-2">
                        <DateMaskedInput 
                            setValue={setValue}
                            name="driver_rg_date"
                            register={register}
                            errors={errors}
                            labelTitle="Data de Emissão"
                        />
                    </div>

                    <div className="sm:col-span-2">
                        <label className="block text-sm font-medium leading-6 text-gray-900">
                            Estado de Emissão
                        </label>
                        <div className="mt-1">
                            <select
                                {...register('driver_rg_uf')}
                                name="driver_rg_uf"
                                id="driver_rg_uf"
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
                        {errors?.driver_rg_uf && (
                            <p className=" text-red-700 text-xs mt-1">
                                {errors.driver_rg_uf.message}
                            </p>
                        )}
                    </div>

                    <div className="sm:col-span-3">
                        <label className="block text-sm font-medium leading-6 text-gray-900">
                          Nome do Pai
                        </label>
                        <div className="mt-1">
                            <input 
                                {...register('driver_father_name')}
                                name="driver_father_name"
                                id="driver_father_name"
                                placeholder="Pedro da Silva"
                                className={`block w-full text-sm p-2 border rounded-md focus:outline-0 text-rede-gray-300 placeholder:text-rede-gray-500 placeholder:text-sm bg-white`} 
                            />
                        </div>
                        {errors?.driver_father_name && (
                            <p className=" text-red-700 text-xs mt-1">
                            {errors.driver_father_name.message}
                        </p>
                        )}

                    </div>

                    <div className="sm:col-span-3">
                        <label className="block text-sm font-medium leading-6 text-gray-900">
                          Nome da Mãe
                        </label>
                        <div className="mt-1">
                            <input
                                {...register('driver_mother_name')}
                                name='driver_mother_name'
                                id='driver_mother_name'
                                placeholder="Joana Pereira"
                                className={`block w-full text-sm p-2 border rounded-md focus:outline-0 text-rede-gray-300 placeholder:text-rede-gray-500 placeholder:text-sm bg-white`} 
                            />
                        </div>
                    </div>

                    <DriverContact 
                        errors={errors}
                        register={register}
                        setValue={setValue}
                        isChecked={isChecked}
                    />
                </div>
            </div>
        </>
    )
}