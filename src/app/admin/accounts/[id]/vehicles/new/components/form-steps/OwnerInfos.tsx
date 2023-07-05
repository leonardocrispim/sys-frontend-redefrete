import FormTitle from "@/components/forms/FormTitle";
import CpfMaskedInput from "../masketInputs/CpfMaskedInput";
import DateMaskedInput from "../../../../drivers/new/components/maskedInputs/DataMaskedInput";
import RgMaskedInput from "../../../../drivers/new/components/maskedInputs/RgMaskedInput";
import { brazilStates } from "@/lib/utils/utilsConstants";

type DataProps = {
    errors: any;
    register: any;
    setValue: any;
  };

export default function OwnerInfos({
    errors,
    register,
    setValue
}: DataProps) {
    return (
        <>
            <div className="border rounded-md p-4 mt-4">
                <div className="mb-6 flex items-center">
                    <FormTitle content="Informações do Proprietário" />
                </div>
                <div className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-4">

                    <div className="sm:col-span-2">
                        <label className="block text-sm font-medium leading-6 text-gray-900">
                            Nome Completo<sup className="text-red-700">*</sup>
                        </label>
                        <div className="mt-1">
                            <input 
                                {...register('vehicle_owner_name')}
                                type='text'
                                name="vehicle_owner_name"
                                id="vehicle_owner_name"
                                placeholder="Gustavo da Fonseca"
                                className={`block w-full text-sm p-2 border rounded-md focus:outline-0 text-rede-gray-300 placeholder:text-rede-gray-500 placeholder:text-sm bg-white`} 
                            />
                        </div>
                        {errors?.vehicle_owner_name && (
                            <p className=" text-red-700 text-xs mt-1">
                                {errors.vehicle_owner_name.message}
                            </p>
                        )}
                    </div>

                    <div className="sm:col-span-2">
                        <CpfMaskedInput
                            register={register} 
                            setValue={setValue}
                            name='vehicle_owner_cpf_cnpj'
                            errors={errors}
                        />
                    </div>

                    <div className="sm:col-span-2">
                        <DateMaskedInput 
                            register={register}
                            name="vehicle_owner_birth_date"
                            errors={errors}
                            setValue={setValue}
                            labelTitle="Data de Nascimento" 
                        />
                    </div>

                    <div className="sm:col-span-2">
                        <label className="block text-sm font-medium leading-6 text-gray-900">
                            Sexo
                        </label>
                        <div className="mt-1">
                            <select
                                {...register('vehicle_owner_sex')}
                                name="vehicle_owner_sex"
                                id="vehicle_owner_sex"
                                className={`block w-full text-sm p-2 border rounded-md focus:outline-0 text-rede-gray-300 placeholder:text-rede-gray-500 placeholder:text-sm bg-white`} 
                            >
                                <option value="">Selecione</option>
                                <option value="Masculino">Masculino</option>
                                <option value="Feminino">Feminino</option>
                                
                            </select>
                        </div>
                    </div>
                    {errors?.vehicle_owner_sex && (
                        <p className=" text-red-700 text-xs mt-1">
                            {errors.vehicle_owner_sex.message}
                        </p>
                    )}

                    <div className="sm:col-span-2">
                        <RgMaskedInput 
                            register={register}
                            errors={errors}
                            name="vehicle_owner_rg"
                        />
                    </div>

                    <div className="sm:col-span-1">
                        <DateMaskedInput 
                            register={register}
                            errors={errors}
                            name="vehicle_owner_rg_date"
                            labelTitle="Data de Emissão"
                            setValue={setValue}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium leading-6 text-gray-900">
                            Estado de Emissão
                        </label>
                        <div className="mt-1">
                            <select
                                {...register('vehicle_owner_rg_uf')}
                                name="vehicle_owner_rg_uf"
                                id="vehicle_owner_rg_uf"
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
                        {errors?.vehicle_owner_rg_uf && (
                            <p className=" text-red-700 text-xs mt-1">
                                {errors.vehicle_owner_rg_uf.message}
                            </p>
                        )}
                    </div>

                    <div className="sm:col-span-2">
                        <label className="block text-sm font-medium leading-6 text-gray-900">
                            Nome do Pai
                        </label>
                        <div className="mt-1">
                            <input 
                                {...register('vehicle_owner_father_name')}
                                name="vehicle_owner_father_name"
                                id="vehicle_owner_father_name"
                                placeholder="Leonardo Crispim"
                                className={`block w-full text-sm p-2 border rounded-md focus:outline-0 text-rede-gray-300 placeholder:text-rede-gray-500 placeholder:text-sm bg-white`} 
                            />
                        </div>
                        {errors?.vehicle_owner_father_name && (
                            <p className=" text-red-700 text-xs mt-1">
                                {errors.vehicle_owner_father_name.message}
                            </p>
                        )}

                    </div>

                    <div className="sm:col-span-2">
                        <label className="block text-sm font-medium leading-6 text-gray-900">
                            Nome da Mãe
                        </label>
                        <div className="mt-1">
                            <input 
                                {...register('vehicle_owner_mother_name')}
                                name="vehicle_owner_mother_name"
                                id="vehicle_owner_mother_name"
                                placeholder="Catarina de Souza"
                                className={`block w-full text-sm p-2 border rounded-md focus:outline-0 text-rede-gray-300 placeholder:text-rede-gray-500 placeholder:text-sm bg-white`} 
                            />
                        </div>
                        {errors?.vehicle_owner_mother_name && (
                            <p className=" text-red-700 text-xs mt-1">
                                {errors.vehicle_owner_mother_name}
                            </p>
                        )}

                    </div>
                </div>
            </div>
        </>
    )
}