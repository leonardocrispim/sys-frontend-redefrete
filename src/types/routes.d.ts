declare module 'RoutesTypes' {
  import { Driver } from 'DriversTypes';
  import { Hub } from 'HubsTypes';
  import { Vehicle } from 'VehiclesTypes';

  export enum RouteStatus {
    ABERTO = 'ABERTO',
    EM_ANDAMENTO = 'EM_ANDAMENTO',
    FINALIZADO = 'FINALIZADO',
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
    created_at: Date;
    updated_at: Date;
    rd_drivers?: Driver;
    rd_vehicles?: Vehicle;
    rd_hubs?: Hub;
  }
}
