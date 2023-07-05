import { Dispatch, SetStateAction } from "react"
import { RdVehicles } from "../../../components/ListVehicles"
import { vehiclesMap } from "@/lib/utils/vehiclesConstants"
import FeedbackError from "@/components/utils/feedbacks/FeedbackError"
import FormTitle from "@/components/forms/FormTitle"
import PlateMaskedInput from "../masketInputs/PlateMaskedInput"
import { Driver } from "DriversTypes"
import RenavamMaskedInput from "../masketInputs/RenavamMasketInput"

type DataType = {
    setHasVehicleType: Dispatch<SetStateAction<boolean>>
    setIsCastrated: Dispatch<SetStateAction<boolean | null>>
    setVehicleRegistered: Dispatch<SetStateAction<boolean>>
    register: any
    setValue: any
    vehicles: RdVehicles[] | null
    saveError: any
    vehicleRegistered: boolean
    hasVehicleType: boolean
    errors: any
}

type VehicleType = {
    value: string;
    type: string;
};

export default function VehicleInfos({
    register,
    setValue,
    errors,
    vehicles,
    saveError,
    vehicleRegistered,
    hasVehicleType,
    setHasVehicleType,
    setIsCastrated,
    setVehicleRegistered
}: DataType) {
    return (
        <>
            <div className="border rounded-md p-4">
                {saveError.length > 0 && <FeedbackError text={saveError} />}
                <div className="mb-6 flex items-center">
                    <FormTitle content='Informações do Veículo' />
                </div>

                <div className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
                    <div>
                        <label className="block text-sm font-medium leading-6 text-gray-900">
                            Digite a Placa do veículo
                        </label>
                        <div className="mt-1">
                        <PlateMaskedInput
                            vehicles={vehicles}
                            register={register}
                            setValue={setValue}
                            name="license_plate"
                            setIsCastrated={setIsCastrated}
                            setHasVehicleType={setHasVehicleType}
                            setVehicleRegistered={setVehicleRegistered}
                        />
                        {vehicleRegistered ? (
                            <p className="font-semibold text-red-700 text-xs mt-1">
                            Veículo já registrado nesta conta
                            </p>
                        ) : (
                            <></>
                        )}
                    </div>
                </div>

                {hasVehicleType ? (
                    <>
                        <div>
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                Tipo de veículo
                            </label>
                            <div className="mt-1">
                            <select
                                {...register('vehicle_type', {
                                required: 'Tipo obrigatório',
                                })}
                                id="vehicle_type"
                                name="vehicle_type"
                                className="w-full bg-white py-2 pl-3 pr-10 cursor-pointer text-sm leading-5 rounded-md text-rede-gray-300 border focus:outline-none focus:border-rede-blue/50"
                            >
                                {vehiclesMap.map((type: VehicleType) => {
                                return (
                                    <option value={type.value} key={type.value}>
                                    {type.type}
                                    </option>
                                );
                                })}
                            </select>
                            {errors.vehicle_type && (
                                <p className=" text-red-700 text-xs mt-1">
                                {errors.vehicle_type.message}
                                </p>
                            )}
                            </div>
                        </div>
                        
                        <div>
                            <RenavamMaskedInput 
                                errors={errors}
                                register={register}
                                name="vehicle_renavam"
                            />
                        </div>
                    </>
                ) : (
                    <></>
                )}
                </div>
            </div>
        </>
    )
}