import { Vehicle } from 'VehiclesTypes';
import TabsPage from '../../components/TabsPage';
import { getVehicle } from '@/lib/vehicles/getVehicles';
import FeedbackError from '@/components/utils/feedbacks/FeedbackError';
import VehicleData from './components/VehicleData';
import { getDriversByPlateAndAccount } from '@/lib/drivers/getDrivers';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import PageTitle from '@/components/utils/PageTitle';
import { Vin_drivers } from 'DriversTypes';
import DriverMap from './components/DriverMap';

export const dynamic = 'force-dynamic';

type DataType = {
  params: {
    id: string;
    plate: string;
  };
};

export default async function VehiclePage({ params }: DataType) {
  const account_id = Number(params.id);
  let isLoading = true;
  let vehicleOk = false;

  function verifyVehicleInfos(res: Vehicle) {
    if (
      !res.vehicle_type ||
      !res.license_plate ||
      !res.vehicle_renavam ||
      !res.rd_vehicle_meta.vehicle_owner_cpf_cnpj ||
      !res.rd_vehicle_meta.vehicle_owner_birth_date ||
      !res.rd_vehicle_meta.vehicle_owner_name ||
      !res.rd_vehicle_meta.vehicle_owner_father_name ||
      !res.rd_vehicle_meta.vehicle_owner_mother_name ||
      !res.rd_vehicle_meta.vehicle_owner_rg ||
      !res.rd_vehicle_meta.vehicle_owner_rg_date ||
      !res.rd_vehicle_meta.vehicle_owner_rg_uf ||
      !res.rd_vehicle_meta.vehicle_owner_sex
    ) {
      vehicleOk = false;
    } else {
      vehicleOk = true;
    }
  }

  const vehicle: Vehicle = await getVehicle(params.plate)
    .then((res) => {
      if (res) {
        verifyVehicleInfos(res);
        return res;
      } else {
        throw new Error('Veículo não encontrado');
      }
    })
    .catch((err) => {
      return <FeedbackError text={err.message} />;
    });

  const drivers = await getDriversByPlateAndAccount({
    license_plate: params.plate,
    account_id: account_id,
  })
    .then((res) => {
      if (res) {
        isLoading = false;
        return res;
      } else {
        throw new Error('Motoristas não encontrados');
      }
    })
    .catch((err) => {
      return <FeedbackError text={err.message} />;
    });

  return (
    <>
      <TabsPage current="vehicles" account_id={account_id} />

      {isLoading && (
        <p className="p-2 rounded-md border text-xl flex items-center text-rede-gray-400 bg-rede-gray-800 border-rede-gray-700">
          <AiOutlineLoading3Quarters className="mr-1 animate-spin h-4 w-4 text-rede-gray-400" />{' '}
          Carregando...
        </p>
      )}

      {drivers && vehicle && (
        <div className="px-4 py-6 border rounded-b-md">
          <VehicleData vehicle={vehicle} />

          <div className="mb-5">
            <PageTitle>Motorista(s)</PageTitle>
          </div>

          {drivers.map((driver: Vin_drivers) => {
            return (
              <DriverMap
                key={driver.driver_id}
                vehicleOk={vehicleOk}
                driver={driver}
                vehicle={vehicle}
                account_id={account_id}
              />
            );
          })}

          {drivers && drivers.length == 0 && (
            <div className="border rounded-md p-4 mb-2">
              <div className="text-rede-red-400 text-lg">
                Não há motoristas vinculados a este veículo
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
