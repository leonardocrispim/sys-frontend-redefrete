'use client';

import { Driver, Vin_drivers } from 'DriversTypes';
import DriverItemList from '../../../drivers/components/DriverItemList';
import TagStatus from '@/components/drivers/TagStatus';

import {
  driversStatusGR,
  driversStatusGRKeys,
  driversStatusRF,
  driversStatusRFKeys,
} from '@/lib/utils/driversConstants';

import Link from 'next/link';
import { AiFillEye, AiOutlineLoading3Quarters } from 'react-icons/ai';
import { Vehicle } from 'VehiclesTypes';
import { getDriver } from '@/lib/drivers/getDrivers';
import FeedbackError from '@/components/utils/feedbacks/FeedbackError';
import { use, useEffect, useState } from 'react';
import { getVinDriverVehicle } from '@/lib/vinDriverVehicle/getVinDriverVehicle';
import { vinDriverVehicle } from '@/lib/drivers/vinDrivers';
import { newRiskManager } from '@/lib/riskManager/newRiskManager';

export const dynamic = 'force-dynamic';

type DataProps = {
  driver: Vin_drivers;
  vehicle: Vehicle;
  account_id: number;
  vehicleOk: boolean;
};

export default function DriverMap({
  driver,
  account_id,
  vehicle,
  vehicleOk,
}: DataProps) {
  const [driverOk, setDriverOK] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  async function verifyDriverInfos(res: Driver) {
    if (
      !res.rd_driver_meta.driver_birth_date ||
      !res.rd_driver_meta.driver_cnh_category ||
      !res.rd_driver_meta.driver_cnh_first_license ||
      !res.rd_driver_meta.driver_cnh_number ||
      !res.rd_driver_meta.driver_cnh_safety_code ||
      !res.rd_driver_meta.driver_cnh_uf ||
      !res.rd_driver_meta.driver_cnh_validate ||
      !res.rd_driver_meta.driver_father_name ||
      !res.rd_driver_meta.driver_mother_name ||
      !res.rd_driver_meta.driver_rg ||
      !res.rd_driver_meta.driver_rg_date ||
      !res.rd_driver_meta.driver_rg_uf ||
      !res.rd_driver_meta.driver_sex ||
      !res.driver_telephone ||
      !res.driver_whatsapp ||
      !res.driver_email ||
      !res.driver_name ||
      !res.driver_cpf_cnpj
    ) {
      setDriverOK(false);
    } else {
      setDriverOK(true);
    }
  }

  async function getDriverInfo() {
    await getDriver(driver.rd_drivers.driver_cpf_cnpj)
      .then((res) => {
        if (res) {
          verifyDriverInfos(res);
          return res;
        } else {
          throw new Error('Motorista não encontrados');
        }
      })
      .catch((err) => {
        return <FeedbackError text={err.message} />;
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    getDriverInfo();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-10 gap-2 mb-2 border rounded-md p-2">
      <div className="sm:col-span-3 flex items-center">
        <DriverItemList driver={driver.rd_drivers} />
      </div>
      <div className="flex items-center gap-6 justify-center col-span-4">
        <div className="">
          <p className="text-xs text-center font-bold mb-1">G. de Risco</p>

          <TagStatus status={driver.status_gr}>
            {driversStatusGR[driver.status_gr as driversStatusGRKeys]}
          </TagStatus>
        </div>

        <div className="">
          <p className="text-xs text-center font-bold mb-1">Redefrete</p>

          <TagStatus status={driver.rd_drivers.driver_status}>
            {
              driversStatusRF[
                driver.rd_drivers.driver_status as driversStatusRFKeys
              ]
            }
          </TagStatus>
        </div>
      </div>

      <div className="flex sm:w-60 sm:ml-10 w-full items-center justify-around mt-4 sm:mt-0">
        {isLoading ? (
          <button
            disabled={true}
            className="inline-flex justify-center rounded-lg text-sm font-semibold py-2 px-4 text-white dark:bg-gray-200 dark:hover:bg-white dark:text-slate-900 w-36 bg-rede-gray-400"
          >
            <AiOutlineLoading3Quarters className="mr-1 animate-spin h-4 w-4 text-white" />{' '}
          </button>
        ) : driverOk && vehicleOk ? (
          <button
            onClick={() => newRiskManager({ vin_id: driver.vin_id })}
            title="Em breve"
            className="inline-flex justify-center rounded-lg text-xs font-semibold py-2 text-white hover:bg-rede-green-400 dark:bg-gray-200 dark:hover:bg-white dark:text-slate-900 sm:w-40 w-36 bg-rede-green"
          >
            CONSULTAR GR
          </button>
        ) : (
          <button
            title="Edite as informações de veículo e motorista"
            disabled={true}
            className="inline-flex justify-center rounded-lg text-xs font-semibold py-2 text-white dark:bg-gray-200 dark:hover:bg-white dark:text-slate-900 w-36 bg-rede-gray-400"
          >
            CADASTRO INCOMPLETO
          </button>
        )}

        <Link
          href={`/admin/accounts/${account_id}/drivers/${driver.rd_drivers.driver_cpf_cnpj}`}
          title="Ver motorista"
          className="rounded-md mr-1 bg-rede-blue-300 p-2 text-white shadow-sm hover:bg-rede-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          <AiFillEye className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
