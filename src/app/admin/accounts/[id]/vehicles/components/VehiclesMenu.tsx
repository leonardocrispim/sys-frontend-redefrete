import { classNames } from '@/lib/utils/utils';
import Link from 'next/link';
import { AiFillCar, AiFillPlusCircle } from 'react-icons/ai';

const menu = [
    {
        name: 'Lista de Veículos',
        href: 'vehicles',
        icon: AiFillCar,
        current: 'List'
    },
    {
        name: 'Novo Veículo',
        href: 'vehicles/new',
        icon: AiFillPlusCircle,
        current: 'New'
    }
]

type PropsType = {
    current: string;
    account_id?: number;
};

export default function VehiclesMenu({ current, account_id }: PropsType) {
    return (
        <>
          {menu.map((item) => (
            <Link
              key={item.name}
              href={`/admin/accounts/${account_id || 0}/${item.href}`}
              className={classNames(
                item.current == current
                  ? 'text-rede-red-300'
                  : 'text-rede-gray-500 hover:text-gray-700',
                ' text-sm font-medium'
              )}
            >
              <div className="mb-2 bg-rede-gray-800 border rounded-md p-2 group gap-x-2 inline-flex items-center w-full">
                <item.icon className="h-5 w-5 flex-none" aria-hidden="true" />
                {item.name}
              </div>
            </Link>
          ))}
        </>
    );
}