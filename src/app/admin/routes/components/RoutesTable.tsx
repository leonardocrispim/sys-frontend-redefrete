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
  hub_id: number[];
};

export default function RoutesListPage() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  const searchParams = useSearchParams()!;

  const createQueryString = useCallback(
    (paramsObject: Object) => {
      //@ts-expect-error
      const params = new URLSearchParams(searchParams);

      Object.entries(paramsObject).forEach(([key, value]) => {
        params.set(key, value);
      });

      return params.toString();
    },
    [searchParams]
  );

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [routeList, setRouteList] = useState([]);

  const [courrentRoutesList, setCourrentRoutesList] = useState<Route[]>([]);
  const [atualPage, setAtualPage] = useState(0);

  const router = useRouter();
  const pathname = usePathname();

  const [selected, setSelected] = useState<Hub[]>([]);

  const { data: session, status } = useSession();

  useEffect(() => {
    if (!session) {
      return;
    }
    setError(null);
    setIsLoading(true);

    const dataSearch = {
      s: searchParams.get('s'),
      hub_id: searchParams.get('hub_id'),
    };

    getRoutesSearch(dataSearch, session?.userdata)
      .then((list) => {
        if (list.length <= 0) {
          throw new Error('Nenhum item encontrado');
        }

        setRouteList(list);

        setCourrentRoutesList(routesPaginate(0, list));
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setAtualPage(0);
        setIsLoading(false);
      });
  }, [session]);

  useEffect(() => {
    setCourrentRoutesList(routesPaginate(atualPage, routeList));
  }, [atualPage]);

  useEffect(() => {
    setValue(
      'hub_id',
      selected.map((sel) => sel.hub_id)
    );
  }, [selected]);

  async function onSubmit(data: FormData) {
    window.location.href = `${pathname}?${createQueryString(data)}`;
  }

  const hub_id =
    searchParams
      .get('hub_id')
      ?.split(',')
      .map((v) => Number(v)) || [];

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
              <FormHubsOptions
                hub_id={hub_id}
                selected={selected}
                setSelected={setSelected}
              />
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

      {error && (
        <p className="p-2 rounded-md border text-xl flex items-center text-rede-gray-400 bg-rede-gray-800 border-rede-gray-700 mb-4">
          {error}
        </p>
      )}

      {courrentRoutesList.length > 0 && (
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
                {courrentRoutesList.map((route: Route) => (
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
                  <span className="font-medium">{atualPage * 10 + 1}</span> a{' '}
                  <span className="font-medium">
                    {Math.min((atualPage + 1) * 10, routeList.length)}
                  </span>{' '}
                  de <span className="font-medium">{routeList.length}</span>{' '}
                  resultados
                </p>
              </div>
              <Paginate
                currentPage={atualPage}
                totalItems={routeList.length}
                itemsPerPage={10}
                hook={setAtualPage}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
