declare module 'VehiclesTypes' {
  export interface Vehicle {
    vehicle_id?: number;
    license_plate: string;
    vehicle_type: string;
    created_at?: Date;
    updated_at?: Date;
  }

  export interface NewVehicle {
    license_plate: string;
    vehicle_type?: string;
  }
}
