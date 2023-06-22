'use client';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import FeedbackError from '@/components/utils/feedbacks/FeedbackError';
import PlateMaskedInput from '../../../drivers/[cpf]/components/maskedInputs/PlateMaskedInput';

type FormValues = {
    license_plate: string;
    vehicle_type: string;
    driver_id: number
}

type PropsType = {
    account_id: number
}

export default function newForm({ account_id }: PropsType) {
    const [saveError, setSaveError] = useState('')

    const [hasVehicleType, setHasVehicleType] = useState(false)
    const [vehicleType, setVehicleType] = useState('')
    const [isCastrated, setIsCastrated] = useState<boolean | null>(null)

    const { data: session, status } = useSession()
    const router = useRouter()

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<FormValues>()

    return (
        <form>
            <div className='border rounded-md p-4'>
                {saveError.length > 0 && <FeedbackError text={saveError} />}

                <div className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                        <label className="block text-sm font-medium leading-6 text-gray-900">
                            Placa
                        </label>
                        
                    </div>
                </div>
            </div>
        </form>
    )
}