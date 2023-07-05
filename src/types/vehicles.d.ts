declare module 'VehiclesTypes' {
  export interface Vehicle {
    vehicle_id?: number;
    license_plate: string;
    vehicle_type: string;
    vehicle_renavam?: string;
    created_at?: Date;
    updated_at?: Date;
    rd_vehicle_meta: {
      vehicle_owner_name?: string | null,
      vehicle_owner_birth_date?: string | null,
      vehicle_owner_cpf_cnpj?: string | null,
      vehicle_owner_sex?: string | null,
      vehicle_owner_rg?: string | null,
      vehicle_owner_rg_date?: string | null,
      vehicle_owner_rg_uf?: string | null,
      vehicle_owner_father_name: string | null,
      vehicle_owner_mother_name: string | null,
    }
  }

  export interface NewVehicle {
    license_plate: string;
    vehicle_type?: string;
    vehicle_renavam?: string | null;
    vehicle_owner_name?: string | null;
    vehicle_owner_cpf_cnpj?: string | null;
    vehicle_owner_birth_date?: string | null;
    vehicle_owner_sex?: string | null;
    vehicle_owner_rg?: string| null;
    vehicle_owner_rg_date?: string| null;
    vehicle_owner_rg_uf?: string | null;
    vehicle_owner_father_name?: string | null;
    vehicle_owner_mother_name?: string | null;
  }
}
