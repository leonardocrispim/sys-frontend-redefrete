declare module 'RoutesTypes' {
  import { Driver } from 'DriversTypes';
  import { Hub } from 'HubsTypes';
  import { Vehicle } from 'VehiclesTypes';

  export enum RouteStatus {
    ABERTO = 'ABERTO',
    EM_ANDAMENTO = 'EM_ANDAMENTO',
    FINALIZADO = 'FINALIZADO',
  }

  export interface Package {
    package_id?: number;
    route_id?: number;
    tracknumber: string;
    package_status: string;
    package_client_status: string;
    created_at: string;
    updated_at: string;
  }

  export interface Route {
    route_id: number;
    route_code: string;
    client_id?: number;
    hub_id?: number;
    driver_id?: number | null;
    vehicle_id?: number | null;
    car_id?: number;
    freight_date?: Date;
    packages_quantity: number;
    packages_delivered: number;
    kms: number;
    on_hold: number;
    status: RouteStatus;
    created_at: string;
    updated_at: string;
    rd_drivers?: Driver;
    rd_vehicles?: Vehicle;
    rd_hubs?: Hub;
    rd_packages?: Package[];
  }
}
