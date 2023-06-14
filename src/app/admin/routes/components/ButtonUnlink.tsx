'use client';

import { useState } from 'react';

import { Route } from 'RoutesTypes';
import { AiOutlineClose, AiOutlineLoading3Quarters } from 'react-icons/ai';

import { editRoute } from '@lib/routes/alterRoutes';
import { Driver } from 'DriversTypes';

type DataProps = {
  route: Route;
  setThisDriver: (thisDriver: Driver | undefined) => void;
};

export default function ButtonUnlink({ route, setThisDriver }: DataProps) {
  const [isLoading, setIsLoading] = useState(false);

  function unlinkDriver() {
    route.driver_id = null;
    route.vehicle_id = null;

    setIsLoading(true);

    editRoute(route)
      .then((data) => {
        if (data.return == 'error') {
          alert('Erro de conexão. Tente mais tarde.');
        } else {
          setThisDriver(undefined);
          alert('Motorista desvinculado!');
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <button
      onClick={unlinkDriver}
      type="button"
      title="Desvincular motorista"
      disabled={isLoading}
      className="rounded-md bg-rede-red-500 p-2 text-white shadow-sm hover:bg-rede focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    >
      {isLoading ? (
        <AiOutlineLoading3Quarters
          className="animate-spin h-4 w-4"
          aria-hidden="true"
        />
      ) : (
        <AiOutlineClose className="h-4 w-4" aria-hidden="true" />
      )}
    </button>
  );
}
