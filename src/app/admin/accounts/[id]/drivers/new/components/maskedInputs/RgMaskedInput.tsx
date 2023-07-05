'use client';

import InputMask from 'react-input-mask'
import { useState } from "react";

type DataType = {
    register: any;
    name: string;
    errors: any;
    isChecked?: boolean | null
};

export default function RgMaskedInput({
    register,
    name,
    errors,
}: DataType) {
    const [mask, setMask] = useState('99.999.999-9')

    return (
        <>
            <label className="block text-sm font-medium leading-6 text-gray-900">
                RG
            </label>
            <div className="mt-1">
                <InputMask 
                    {...register(name)}
                    name={name}
                    id={name}
                    mask={mask}
                    maskChar=""
                    type='text'
                    placeholder='00.000.000-0'
                    className={`block w-full text-sm p-2 border rounded-md focus:outline-0 text-rede-gray-300 placeholder:text-rede-gray-500 placeholder:text-sm bg-white`} 
                />
                {errors[name]  && (
                    <p className=" text-red-700 text-xs mt-1">{errors[name].message}</p>
                )}
            </div>
        </>
    )
}