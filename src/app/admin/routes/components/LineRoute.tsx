import { Route } from 'RoutesTypes';

import { useState } from 'react';

import { MdDriveEta } from 'react-icons/md';

import TagStatus from '@components/routes/TagStatus';

import DriverItemList from './DriverItemList';
import ButtonUnlink from './ButtonUnlink';

import { calcularPorcentagem, formatDecimal, formatDateBR } from '@utils/utils';
import ModalDriver from './ModalDriver';

type DataProps = {
  route: Route;
};

export default function LineRoute({ route }: DataProps) {
  const [isOpenModalDriver, setIsOpenModalDriver] = useState(false);
  const [thisDriver, setThisDriver] = useState(route.rd_drivers);

  const qtdDelivered = route.rd_packages
    ? route.rd_packages?.filter(
        (pkg) => pkg.package_client_status == 'Delivered'
      ).length
    : 0;

  const qtdPackages = route.rd_packages ? route.rd_packages.length : 0;

  return (
    <tr key={route.route_code}>
      <td className="whitespace-nowrap p-2">
        <DriverItemList driver={thisDriver} />
      </td>
      <td className="p-2">
        <div className="font-semibold text-sm">{route.route_code}</div>
        <div className=" text-xs text-gray-500">
          {route?.freight_date && formatDateBR(route.freight_date)}
        </div>
      </td>

      <td className="p-2 text-sm text-gray-500">
        {route.rd_hubs?.hub_name ? (
          <>
            <div className="text-gray-900">{route.rd_hubs.hub_name}</div>
            <div className=" text-gray-500">
              {route.rd_hubs.rd_clients.client_name}
            </div>
          </>
        ) : (
          <div className=" text-gray-500">Hub não cadastrado</div>
        )}
      </td>

      <td className="whitespace-nowrap  p-2 text-sm text-gray-500">
        <TagStatus status={route.status}>{route.status}</TagStatus>
      </td>
      <td className="whitespace-nowrap  p-2 text-md text-gray-500">
        <div className="text-gray-900 font-bold">
          {formatDecimal(calcularPorcentagem(qtdDelivered, qtdPackages))}%
        </div>
        <div className=" text-gray-500 text-xs">
          {qtdDelivered}/{qtdPackages} pcts
        </div>
      </td>

      <td className="p-2 whitespace-nowrap">
        <button
          type="button"
          title="Vincular motorista"
          onClick={() => {
            setIsOpenModalDriver(true);
          }}
          className="rounded-md mr-1 bg-rede-yellow-600 p-2 text-white shadow-sm hover:bg-rede-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          <MdDriveEta className="h-4 w-4" aria-hidden="true" />
        </button>
        <ModalDriver
          setIsOpenModalDriver={setIsOpenModalDriver}
          isOpenModalDriver={isOpenModalDriver}
          route={route}
          setThisDriver={setThisDriver}
          thisDriver={thisDriver}
        />
        {thisDriver && (
          <ButtonUnlink route={route} setThisDriver={setThisDriver} />
        )}
      </td>
    </tr>
  );
}
