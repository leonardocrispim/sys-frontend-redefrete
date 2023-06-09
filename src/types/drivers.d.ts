declare module 'DriversTypes' {
  import { Vehicle } from 'VehiclesTypes';

  export interface DriverVinVehicles {
    vin_id: number;
    driver_id: number;
    vehicle_id: namber;
    created_at: Date;
    updated_at: Date;
    rd_vehicles: Vehicle;
  }

  export interface Driver {
    driver_id?: number;
    driver_name: string;
    driver_cpf_cnpj: string;
    driver_photo?: string | null;
    driver_telephone?: string | null;
    driver_email?: string | null;
    driver_status: string;
    driver_status_gr: string;
    created_by?: number | null;
    created_at?: Date;
    updated_at?: Date;
    rd_vin_drivers_vehicles?: DriverVinVehicles[];
  }

  export interface DriversSearchData {
    driver_status?: string;
    driver_status_gr?: string;
    take?: number;
    skip?: number;
    s?: string;
  }
}
