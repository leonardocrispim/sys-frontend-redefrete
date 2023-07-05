'use client';

import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { AiOutlineSearch } from 'react-icons/ai';
import { useSession } from 'next-auth/react';

import { useState, useEffect, useCallback } from 'react';
import { getRoutesSearch } from '@/lib/routes/getRoutes';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';

import { Route } from 'RoutesTypes';
import LineRoute from './LineRoute';

import Paginate from '@components/utils/Paginate';
import FormHubsOptions from './FormHubsOptions';
import { useForm } from 'react-hook-form';
import { Hub } from 'HubsTypes';
import { ApiReturn } from 'UtilsTypes';
import FeedbackInfo from '@/components/utils/feedbacks/FeedbackInfo';
import FeedbackError from '@/components/utils/feedbacks/FeedbackError';

function routesPaginate(page: number, routeList: Route[]): Route[] {
  if (routeList.length < 1) {
    return [];
  }

  const pageSize = 10;
  const startPage = page * pageSize;
  const endPage = startPage + pageSize;
  const list = routeList.slice(startPage, endPage);

  return list;
}

type FormData = {
  s: string;
  hub_id: string;
};

export default function RoutesListPage() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  const [isLoading, setIsLoading] = useState(false);

  const itemsPerPage = 20;

  const searchParams = useSearchParams();
  const route = useRouter();

  const { data: session, status } = useSession();

  const [totalItems, setTotalItems] = useState<number>(0);
  const [isEmpty, setIsEmpty] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [routes, setRoutes] = useState<Route[] | undefined | null>();

  const pathname = usePathname();

  const [currentPage, setCurrentPage] = useState<number>(
    Number(searchParams.get('page'))
  );

  const [search, setSearch] = useState<string>(searchParams.get('s') || '');
  const [searchBack, setSearchBack] = useState<string>(
    searchParams.get('s') || ''
  );

  const [hubIds, setHubIds] = useState<string>(
    searchParams.get('hub_id') || ''
  );

  const [hubs, setHubs] = useState<Hub[]>([]);

  function searchRoutes() {
    if (!session) {
      return;
    }

    setRoutes(null);
    setIsError(false);
    setIsEmpty(false);
    setIsLoading(true);

    console.log({
      hub_id: hubIds,
      s: search,
      skip: currentPage * itemsPerPage,
      take: itemsPerPage,
    });

    getRoutesSearch(
      {
        hub_id: hubIds,
        s: search,
        skip: currentPage * itemsPerPage,
        take: itemsPerPage,
      },
      session?.userdata
    )
      .then((data: ApiReturn<Route[]>) => {
        console.log(data);
        if (data.return == 'success') {
          if (data.data && data.data.length == 0) {
            setIsEmpty(true);
            setTotalItems(0);
          } else {
            setIsEmpty(false);
            setTotalItems(Number(data.count_total));
            setRoutes(data.data);
          }
        } else {
          setTotalItems(0);
          setIsError(true);
        }

        route.push(
          pathname + `?s=${search}&page=${currentPage}&hub_id=${hubIds}`
        );
      })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    searchRoutes();
  }, [currentPage]);

  useEffect(() => {
    searchRoutes();
  }, [session]);

  useEffect(() => {
    setCurrentPage(0);
    setSearchBack(search);
    searchRoutes();
  }, [search, hubIds]);

  useEffect(() => {
    const ids = hubs.map((h) => h.hub_id).join(',');
    setValue('hub_id', ids);
  }, [hubs]);

  async function onSubmit(data: FormData) {
    setSearch(data.s);
    setHubIds(data.hub_id);
  }

  return (
    <div>
      <div className="mb-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 sm:grid-cols-6 gap-4">
            <div className="sm:col-span-3">
              <input
                {...register('s')}
                type="search"
                name="s"
                id="s"
                defaultValue={searchParams.get('s') || ''}
                placeholder="Buscar..."
                autoComplete="address-level1"
                className="block bg-white w-full text-sm p-2 border rounded-md focus:outline-0 text-rede-gray-300 placeholder:text-rede-gray-500 placeholder:text-sm"
              />
            </div>

            <div className="sm:col-span-2">
              <FormHubsOptions hubs={hubs} setHubs={setHubs} />
            </div>

            <div className="">
              <button
                type="submit"
                disabled={isLoading}
                className={
                  `inline-flex justify-center rounded-lg text-sm font-semibold py-2 px-4 text-white hover:bg-rede-blue-400 dark:bg-gray-200 dark:hover:bg-white dark:text-slate-900 w-full` +
                  (isLoading ? ' bg-rede-gray-400' : ' bg-rede-blue')
                }
              >
                <span>BUSCAR</span>
                <AiOutlineSearch className=" -mr-1 ml-3 h-5 w-5 text-white dark:text-slate-900" />
              </button>
            </div>
          </div>
        </form>
      </div>

      {isLoading && (
        <p className="p-2 rounded-md border text-xl flex items-center text-rede-gray-400 bg-rede-gray-800 border-rede-gray-700 mb-4">
          <AiOutlineLoading3Quarters className="mr-1 animate-spin h-4 w-4 text-rede-gray-400" />{' '}
          Carregando...
        </p>
      )}

      {isEmpty && (
        <FeedbackInfo text="Nenhuma conta encontrada, por favor refaça a busca!" />
      )}

      {isError && (
        <FeedbackError text="Houve um erro de conexão, por favor tente mais tarde!" />
      )}

      {routes && routes.length > 0 && (
        <div className="border rounded-md">
          <div className=" overflow-x-auto min-w-full align-middle">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="text-left text-sm font-semibold text-gray-900 p-2"
                  >
                    Motorista
                  </th>
                  <th
                    scope="col"
                    className="text-left text-sm font-semibold text-gray-900 p-2"
                  >
                    Rota
                  </th>

                  <th
                    scope="col"
                    className="text-left text-sm font-semibold text-gray-900 p-2"
                  >
                    Hub
                  </th>

                  <th
                    scope="col"
                    className="text-left text-sm font-semibold text-gray-900 p-2"
                  >
                    Status
                  </th>

                  <th
                    scope="col"
                    className="text-left text-sm font-semibold text-gray-900 p-2"
                  >
                    Eficiência
                  </th>

                  <th></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {routes.map((route: Route) => (
                  <LineRoute key={route.route_id} route={route} />
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between border-t border-gray-200 bg-white px-2 py-3">
            <div className="sm:flex sm:flex-1 sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Mostrando de{' '}
                  <span className="font-medium">
                    {currentPage * itemsPerPage + 1}
                  </span>{' '}
                  a{' '}
                  <span className="font-medium">
                    {currentPage * itemsPerPage + routes.length}
                  </span>{' '}
                  de <span className="font-medium">{totalItems}</span>{' '}
                  resultados
                </p>
              </div>
              <Paginate
                currentPage={currentPage}
                totalItems={totalItems}
                itemsPerPage={itemsPerPage}
                hook={setCurrentPage}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
