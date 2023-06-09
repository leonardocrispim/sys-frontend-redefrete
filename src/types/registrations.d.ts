declare module 'RegistrationsTypes' {
  export interface Registration {
    registration_id?: number;
    driver_name: string;
    driver_cpf_cnpj: string;
    driver_telephone: string;
    driver_email: string;
    vehicle_license_plate: string;
    vehicle_type: string;
    address_street: string;
    address_number: string;
    address_complement: string;
    address_district: string;
    address_city: string;
    address_state: string;
    address_zip_code: string;
    registration_status: string;
    registration_status_gr: string;
    created_at?: string;
    updated_at?: string;
  }

  export interface RegistrationsSearchData {
    registration_status?: string;
    registration_status_gr?: string;
    take?: number;
    skip?: number;
    s?: string;
  }
}
