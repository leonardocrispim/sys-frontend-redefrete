'use client';

import { useState } from 'react';
import InputMask from 'react-input-mask'

type DataType = {
    register: any;
    name: string;
    errors: any;
};

export default function CnhCodeMaskedInput({
    register,
    name,
    errors
}: DataType) {
    const [mask, setMask] = useState('99999999999')

    return (
        <>
            <label className="block text-sm font-medium leading-6 text-gray-900">
                   Código de Segurança
            </label>
            <div className="mt-1">
                <InputMask 
                    {...register(name)}
                    name={name}
                    id={name}
                    mask={mask}
                    maskChar={''}
                    placeholder='00000000000'
                    className={`block w-full text-sm p-2 border rounded-md focus:outline-0 text-rede-gray-300 placeholder:text-rede-gray-500 placeholder:text-sm bg-white`} 
                />
                {errors[name]  && (
                    <p className=" text-red-700 text-xs mt-1">{errors[name].message}</p>
                )}
            </div>
        </>
    )
}