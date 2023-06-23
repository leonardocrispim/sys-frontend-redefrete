'use client';

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { RdVehicles } from "../../../components/ListVehicles";
import { getVehicle } from "@/lib/vehicles/getVehicles";
import { Vehicle } from "VehiclesTypes";
import InputMask from "react-input-mask";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

type DataType = {
    setHasVehicleType: Dispatch<SetStateAction<boolean>>
    setIsCastrated: Dispatch<SetStateAction<boolean | null>>
    setVehicleRegistered: Dispatch<SetStateAction<boolean>>
    register: any
    setValue: any
    name: string
    vehicles: RdVehicles[] | null
}

export default function PlateMaskedInput({
    setHasVehicleType,
    setIsCastrated,
    setVehicleRegistered,
    register,
    setValue,
    name,
    vehicles,
}: DataType) {
    const [plate, setPlate] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const license_plates = vehicles?.map((vehicle: RdVehicles) => {
        return vehicle.rd_vehicles.license_plate
    })

    useEffect(
        function () {
            setValue(name, plate)
            setHasVehicleType(false)
            setIsCastrated(true)

            if(plate.length >= 8) {
                setIsLoading(true)

                getVehicle(plate)
                    .then((vehicle: Vehicle | null) => {
                        if(vehicle) {
                            setIsCastrated(true)
                            setVehicleRegistered(true)
                            setTimeout(() => {
                                setVehicleRegistered(false)
                                setPlate("")
                            }, 2000)
                        } else {
                            setHasVehicleType(true)
                            setIsCastrated(false)
                            setVehicleRegistered(false)
                        }
                    })
                    .finally(() => {
                        setIsLoading(false)
                    })
            }
        },
        [plate]
    )

    return (
        <>
            <InputMask
                {...register(name, {
                    validate: (value: string) => {
                        if(value.length < 8) {
                            return 'Placa Inválida'
                        }

                        //Arrumar: Não está entrando na validação
                        if(license_plates?.includes(plate.replace('-', '').trim())) {
                            return 'Placa já registrada nesta conta'
                        }

                        return true
                    },
                })}
                name={name}
                id={name}
                mask={"aaa-9*99"}
                maskChar=""
                disabled={isLoading}
                placeholder="AAA-0X00"
                type='text'
                value={plate}
                onChange={(event: any) => setPlate(event.target.value.toUpperCase())}
                className="w-full bg-white py-2 pl-3 pr-10 text-sm leading-5 rounded-md text-rede-gray-300 border focus:outline-none border-rede-gray-400 focus:border-rede-blue/50 "
            />
            {isLoading && (
                <p className="p-1 rounded-md border text-xl flex items-center text-rede-gray-400 bg-rede-gray-800 border-rede-gray-700">
                    <AiOutlineLoading3Quarters className="mr-1 animate-spin h-4 w-4 text-rede-gray-400" />{' '}
                    Carregando...
                </p>
            )}
        </>
    )
}