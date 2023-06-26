'use client';
import { Vehicle } from "VehiclesTypes";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { AiOutlineLoading3Quarters } from 'react-icons/ai';

import { getVehiclesByAccountId } from "@/lib/vehicles/getVehiclesByAccountId";
import LineVehicle from "./LineVehicle";
import FeedbackInfo from "@/components/utils/feedbacks/FeedbackInfo";

type DataProps = {
    account_id: number;
};

export type RdVehicles = {
    rd_vehicles: Vehicle
}

export default function ListVehicles({ account_id }: DataProps) {
    const itemsPerPage = 20;

    //const searchParams = useSearchParams()
    //const router = useRouter()

    const [totalItems, setTotalItems] = useState<number>(0)
    const [isEmpty, setIsEmpty] = useState<boolean>(false)
    const [isError, setIsError] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [vehicles, setVehicles] = useState<RdVehicles[] | undefined | null>()

    const pathName = usePathname()

    // const [currentPage, setCurrentPage] = useState<number>(
    //     Number(searchParams.get('page'))
    // )

    //const [search, setSearch] = useState<string>(searchParams.get('s') || '')
    //const [searchBack, setSearchBack] = useState<string>(searchParams.get('s') || '')

    async function searchVehicles() {
        setVehicles(null)
        setIsEmpty(false)
        setIsError(false)
        setIsLoading(true)

        try {
            const data = await getVehiclesByAccountId({
                account_id: account_id
            })

            if (data && data.length == 0) {
                setIsEmpty(true)
                setTotalItems(0)
            } else {
                setVehicles(data)
            }
        
        } catch (error) {
            console.log(error)
            setIsLoading(false)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        searchVehicles()
    }, [])

    return (
        <>
            {isLoading && (
                <p className="p-2 rounded-md border text-xl flex items-center text-rede-gray-400 bg-rede-gray-800 border-rede-gray-700 mb-4">
                    <AiOutlineLoading3Quarters className="mr-1 animate-spin h-4 w-4 text-rede-gray-400" />{' '}
                    Carregando...
                </p>
            )}

            {
                vehicles && (
                    vehicles.map((vehicle: RdVehicles) => {
                        return (
                            <LineVehicle
                                key={vehicle.rd_vehicles.vehicle_id}
                                vehicle={vehicle.rd_vehicles}
                                account_id={account_id}
                            />
                        )
                    })
                )
            }

            {isEmpty && (
                <FeedbackInfo text="Nenhum veículo encontrado, por favor refaça a busca ou cadastre veículos!" />
            )}
        </>
    )
}