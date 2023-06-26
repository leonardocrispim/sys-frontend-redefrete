'use client';
import PageTitle from "@/components/utils/PageTitle";
import { Vin_drivers } from "DriversTypes";
import { useState } from "react";
import DriverItemList from "../../../drivers/components/DriverItemList";
import TagStatus from "@/components/drivers/TagStatus";
import Link from "next/link";
import { AiFillEye } from "react-icons/ai";

import {
    driversStatusGR,
    driversStatusGRKeys,
    driversStatusRF,
    driversStatusRFKeys,
  } from '@/lib/utils/driversConstants';

type DataType = {
    drivers: Vin_drivers[]
    account_id: number
}

export default function DriversData({ drivers, account_id }: DataType) {
    const [driversData, setDriversData] = useState(drivers)
    
    return (
        <>
            <div className="mb-5">
                <PageTitle>Motorista(s)</PageTitle>
            </div>

            {driversData && (
                driversData.map((driver: Vin_drivers) => {
                    return (
                        <div className="grid grid-cols-1 sm:grid-cols-10 gap-2 mb-2 border rounded-md p-2">
                          <div className="sm:col-span-5 flex items-center">
                            <DriverItemList driver={driver.rd_drivers} />
                          </div>
                          <div className="flex items-center gap-2 justify-center col-span-4">
                            <div className="">
                              <p className="text-xs text-center font-bold mb-1">G. de Risco</p>
                              <TagStatus status={driver.rd_drivers.driver_status_gr}>
                                {driversStatusGR[driver.rd_drivers.driver_status_gr as driversStatusGRKeys]}
                              </TagStatus>
                            </div>
                    
                            <div className="">
                              <p className="text-xs text-center font-bold mb-1">Redefrete</p>
                    
                              <TagStatus status={driver.rd_drivers.driver_status}>
                                {driversStatusRF[driver.rd_drivers.driver_status as driversStatusRFKeys]}
                              </TagStatus>
                            </div>
                          </div>
                    
                          <div className="flex items-center justify-end">
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
                })
            )}

            {driversData && driversData.length == 0 && (
              <div className="border rounded-md p-4 mb-2">
                <div className="text-rede-red-400 text-lg">
                  Não há motoristas vinculados a este veículo
                </div>
              </div>
            )}
        </>
    )
}