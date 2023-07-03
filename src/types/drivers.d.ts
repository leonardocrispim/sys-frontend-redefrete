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
    account_id?: number | null;
    driver_name: string;
    driver_cpf_cnpj: string;
    driver_photo?: string | null;
    driver_telephone?: string | null;
    driver_whatsapp?: string | null;
    driver_email?: string | null;
    driver_status: string;
    driver_status_gr: string;
    created_by?: number | null;
    created_at?: Date;
    updated_at?: Date;
    rd_vin_drivers_vehicles?: DriverVinVehicles[];
  }

  export interface Driver_Infos {
    driver_id?: number;
    account_id: number;
    driver_name: string;
    driver_cpf_cnpj: string;
    driver_photo?: string | null;
    driver_telephone?: string | null;
    driver_whatsapp?: string | null;
    driver_email?: string | null;
    driver_status: string;
    address_zip_code?: string | null;
    address_street?: string | null;
    address_number?: string | null;
    address_complement?: string | null;
    address_district?: string | null;
    address_city?: string | null;
    address_state?: string | null;
    created_by?: number | null;
    created_at?: Date;
    updated_at?: Date;
    license_plate: string
  }

  export interface DriversSearchData {
    account_id: number;
    driver_status?: string;
    driver_status_gr?: string;
    take?: number;
    skip?: number;
    s?: string;
  }

  export type rd_vin_drivers_vehicles_info = {
    driver_id: number
    vehicle_id: number
    rd_drivers: {
      driver_id: number,
      driver_name: string,
      driver_whatsapp: string | null,
      driver_cpf_cnpj: string
    }
    rd_vehicles: {
      vehicle_id: number,
      vehicle_type: string,
      license_plate: string,
      created_at: Date
    }
  }

  export type Vin_drivers = {
    vin_id: number,
    driver_id: number,
    vehicle_id: number,
    created_at: Date,
    updated_at: Date,
    rd_drivers: {
      driver_id: number,
      account_id: number,
      driver_name: string,
      driver_cpf_cnpj: string,
      driver_photo?: string | null,
      driver_telephone?: string | null,
      driver_whatsapp?: string | null,
      driver_email?: string | null,
      driver_status: string,
      driver_status_gr: string,
      created_by?: number | null,
      created_at: Date,
      updated_at: Date
    }
  }
}
