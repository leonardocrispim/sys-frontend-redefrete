'use client';
import { Vehicle } from 'VehiclesTypes';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { AiOutlineLoading3Quarters } from 'react-icons/ai';

import { getVehiclesByAccountId } from '@/lib/vehicles/getVehiclesByAccountId';
import LineVehicle from './LineVehicle';
import FeedbackInfo from '@/components/utils/feedbacks/FeedbackInfo';
import SearchForm from './SearchForm';
import { ApiReturn } from 'UtilsTypes';
import Paginate from '@/components/utils/Paginate';

type DataProps = {
  account_id: number;
};

export type RdVehicles = {
  rd_vehicles: Vehicle;
};

export default function ListVehicles({ account_id }: DataProps) {
  const itemsPerPage = 10;

  const searchParams = useSearchParams();
  //const router = useRouter()

  const [totalItems, setTotalItems] = useState<number>(0);
  const [isEmpty, setIsEmpty] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [vehicles, setVehicles] = useState<RdVehicles[] | undefined | null>();

  //const pathName = usePathname();

  const [currentPage, setCurrentPage] = useState<number>(
    Number(searchParams.get('page'))
  );

  const [search, setSearch] = useState<string>(searchParams.get('s') || '');
  const [searchBack, setSearchBack] = useState<string>(
    searchParams.get('s') || ''
  );

  async function searchVehicles() {
    setVehicles(null);
    setIsEmpty(false);
    setIsError(false);
    setIsLoading(true);

    getVehiclesByAccountId({
      account_id: account_id,
      s: search,
      skip: currentPage * itemsPerPage,
      take: itemsPerPage,
    })
      .then((data: ApiReturn<RdVehicles[]>) => {
        if (data.return == 'success') {
          if (data.data && Number(data.count_items) == 0) {
            setIsEmpty(true);
            setTotalItems(0);
          } else {
            setTotalItems(Number(data.count_items));
            setVehicles(data.data);
          }
        } else {
          setTotalItems(0);
          setIsError(true);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    if (search == searchBack) {
      searchVehicles();
    }
  }, [currentPage]);

  useEffect(() => {
    setCurrentPage(0);
    setSearchBack(search);
    searchVehicles();
  }, [search]);

  return (
    <>
      <div className="mb-4">
        <SearchForm search={search} setSearch={setSearch} />
      </div>

      {isLoading && (
        <p className="p-2 rounded-md border text-xl flex items-center text-rede-gray-400 bg-rede-gray-800 border-rede-gray-700 mb-4">
          <AiOutlineLoading3Quarters className="mr-1 animate-spin h-4 w-4 text-rede-gray-400" />{' '}
          Carregando...
        </p>
      )}

      {vehicles &&
        vehicles.map((vehicle: RdVehicles) => {
          return (
            <LineVehicle
              key={vehicle.rd_vehicles.vehicle_id}
              vehicle={vehicle.rd_vehicles}
              account_id={account_id}
            />
          );
        })}

      {isEmpty && (
        <FeedbackInfo text="Nenhum veículo encontrado, por favor refaça a busca ou cadastre veículos!" />
      )}

      {!isLoading && (
        <div className="flex justify-end mt-4 pb-20">
          <Paginate
            currentPage={currentPage}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            hook={setCurrentPage}
          />
        </div>
      )}
    </>
  );
}
