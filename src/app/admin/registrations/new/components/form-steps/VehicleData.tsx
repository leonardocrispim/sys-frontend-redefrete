import { VehiclesConstants } from '@/lib/utils/vehiclesConstants';
import PlateMaskedInput from './maskedInputs/PlateMaskedInput';

type DataProps = {
  errors: any;
  register: any;
  setValue: any;
};

export default function VehicleData({ errors, register, setValue }: DataProps) {
  return (
    <>
      <div className="border rounded-md p-4">
        <div className="mb-6">
          <h2 className="font-semibold text-gray-800 text-xl underline-offset-8 underline">
            Dados do Veículo
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-6">
          <div>
            <PlateMaskedInput
              setValue={setValue}
              name="vehicle_license_plate"
              register={register}
              errors={errors}
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Tipo de Veículo<sup className="text-red-700">*</sup>
            </label>
            <div className="mt-1">
              <select
                {...register('vehicle_type', {
                  required: 'Tipo é obrigatório',
                })}
                name="vehicle_type"
                id="vehicle_type"
                className="block bg-white w-full text-sm p-2 border rounded-md focus:outline-0 text-rede-gray-300 placeholder:text-rede-gray-500 placeholder:text-sm"
              >
                <option value="">Selecione</option>
                {Object.entries(VehiclesConstants).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
            {errors?.vehicle_type && (
              <p className=" text-red-700 text-xs mt-1">
                {errors.vehicle_type.message}
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
