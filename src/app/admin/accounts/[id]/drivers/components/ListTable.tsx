'use client';
import { Driver } from 'DriversTypes';
import LineDriver from './LineDriver';
import { ApiReturn } from 'UtilsTypes';
import Paginate from '@/components/utils/Paginate';
import FeedbackInfo from '@/components/utils/feedbacks/FeedbackInfo';
import { useSearchParams /*useRouter, usePathname*/ } from 'next/navigation';
import { getDrivers } from '@/lib/drivers/getDrivers';
import { useEffect, useState } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import SearchForm from './SearchForm';
import FeedbackError from '@/components/utils/feedbacks/FeedbackError';

type DataProps = {
  account_id: number;
};

export default function ListTable({ account_id }: DataProps) {
  const itemsPerPage = 10;

  const searchParams = useSearchParams();
  // const route = useRouter();

  const [totalItems, setTotalItems] = useState<number>(0);
  const [isEmpty, setIsEmpty] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [drivers, setDrivers] = useState<Driver[] | undefined | null>();

  // const pathname = usePathname();

  const [currentPage, setCurrentPage] = useState<number>(
    Number(searchParams.get('page')) || 0
  );

  const [search, setSearch] = useState<string>(searchParams.get('s') || '');
  const [searchBack, setSearchBack] = useState<string>(
    searchParams.get('s') || ''
  );

  function searchDrivers() {
    setDrivers(null);
    setIsError(false);
    setIsEmpty(false);
    setIsLoading(true);

    getDrivers({
      account_id: account_id,
      s: search,
      skip: currentPage * itemsPerPage,
      take: itemsPerPage,
    })
      .then((data: ApiReturn<Driver[]>) => {
        console.log(data);

        if (data.return == 'success') {
          if (data.data && Number(data.count_items) == 0) {
            setIsEmpty(true);
            setTotalItems(0);
          } else {
            setTotalItems(Number(data.count_total));
            setDrivers(data.data);
          }
        } else {
          setTotalItems(0);
          setIsError(true);
        }

        // route.push(pathname + `?s=${search}&page=${currentPage}`);
      })
      .finally(() => {
        setIsLoading(false);

        console.log('currentPage', currentPage);
        console.log('totalItems', totalItems);
        console.log('itemsPerPage', itemsPerPage);
      });
  }

  useEffect(() => {
    if (search == searchBack) {
      searchDrivers();
    }
  }, [currentPage]);

  useEffect(() => {
    setCurrentPage(0);
    setSearchBack(search);
    searchDrivers();
  }, [search]);

  return (
    <div>
      <div className="mb-4">
        <SearchForm search={search} setSearch={setSearch} />
      </div>

      {isLoading && (
        <p className="p-2 rounded-md border text-xl flex items-center text-rede-gray-400 bg-rede-gray-800 border-rede-gray-700 mb-4">
          <AiOutlineLoading3Quarters className="mr-1 animate-spin h-4 w-4 text-rede-gray-400" />{' '}
          Carregando...
        </p>
      )}
      {drivers &&
        drivers.map((driver: Driver) => (
          <LineDriver
            key={driver.driver_cpf_cnpj}
            driver={driver}
            account_id={account_id}
          />
        ))}

      {isEmpty && (
        <FeedbackInfo text="Nenhum motorista encontrado, por favor refaça a busca ou cadastre motoristas!" />
      )}

      {isError && (
        <FeedbackError text="Houve um erro de conexão, por favor tente mais tarde!" />
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
    </div>
  );
}
