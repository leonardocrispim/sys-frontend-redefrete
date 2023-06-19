import { ApiReturn } from 'UtilsTypes';
import { Account } from 'AccountsTypes';
import { getAccount } from '@/lib/accounts/getAccounts';
import FeedbackError from '@/components/utils/feedbacks/FeedbackError';
import AccountHeader from '../../components/AccountHeader';
import TabsPage from '../../components/TabsPage';
import DriversMenu from '../components/DriversMenu';
import DriverData from './components/DriverData';
import { getDriver } from '@/lib/drivers/getDrivers';
import { Driver } from 'DriversTypes';
import VehiclesData from './components/VehiclesData';

type DataType = {
  params: {
    id: string;
    cpf: string;
  };
};

export default async function accountsPage({ params }: DataType) {
  const accountId = Number(params.id);

  const driver = await getDriver(params.cpf)
    .then((res: Driver) => {
      if (res) {
        return res;
      } else {
        throw new Error('Motorista não encontrado');
      }
    })
    .catch((err) => {
      return <FeedbackError text={err.message} />;
    });

  return (
    <>
      <TabsPage current="drivers" account_id={accountId} />

      <div className="px-4 py-6 border rounded-b-md">
        {/* @ts-ignore */}
        <DriverData driver={driver} />

        <VehiclesData
          // @ts-ignore
          driverId={driver.driver_id as number}
          // @ts-ignore
          driverVehicles={driver.rd_vin_drivers_vehicles}
        />
      </div>
    </>
  );
}
