import { isValidEmail } from "@/lib/utils/utils";
import TelephoneMaskedInput from "../maskedInputs/TelephoneMaskedInput";

type DataProps = {
    errors: any;
    register: any;
    setValue: any;
    isChecked: boolean
  };

export function DriverContact({
    errors,
    register,
    setValue,
    isChecked
}: DataProps) {
    
    return (
        <>
            
            <div className="mb-2 sm:col-span-6">
                <h2 className="font-semibold text-gray-800 text-lg underline-offset-8 underline">
                    Dados de Contato
                </h2>
            </div>

            <div className="sm:col-span-2">
                <TelephoneMaskedInput
                    setValue={setValue}
                    name="driver_telephone"
                    register={register}
                    errors={errors}
                    title="Telefone"
                    isChecked={isChecked}
                />
            </div>
            <div className="sm:col-span-2">
                <TelephoneMaskedInput
                    setValue={setValue}
                    name="driver_whatsapp"
                    register={register}
                    errors={errors}
                    title="Whatsapp"
                    isChecked={isChecked}
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
                    readOnly={isChecked}
                    className={`block w-full text-sm p-2 border rounded-md focus:outline-0 text-rede-gray-300 placeholder:text-rede-gray-500 placeholder:text-sm ${isChecked ? ` bg-rede-gray-600` : `bg-white`}`} 
                />
                {errors?.driver_email && (
                    <p className=" text-red-700 text-xs mt-1">
                        {errors.driver_email.message}
                    </p>
                    )}
                </div>
            </div>
               
        </>
    )
}