import { getDriver } from '@/lib/drivers/getDrivers';

import { Driver } from 'DriversTypes';

import DriverData from './components/DriverData';
import VehiclesData from './components/VehiclesData';
import FeedbackError from '@/components/utils/feedbacks/FeedbackError';

export const dynamic = 'force-dynamic';

type DataType = {
  params: {
    cpf: string;
  };
};

export default async function DriverPage({ params }: DataType) {
  const driver: Driver = await getDriver(params.cpf);

  if (driver?.driver_id == undefined) {
    return (
      <div className="mb-10">
        <FeedbackError text="Link inválido!" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-10">
        <DriverData driver={driver} />
      </div>

      <div>
        <VehiclesData
          driverId={driver.driver_id as number}
          driverVehicles={driver.rd_vin_drivers_vehicles}
        />
      </div>
    </div>
  );
}
