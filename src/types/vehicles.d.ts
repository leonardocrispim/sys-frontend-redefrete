declare module 'VehiclesTypes' {
  export interface Vehicle {
    vehicle_id?: number;
    account_id: number;
    license_plate: string;
    vehicle_type: string;
    created_at?: Date;
    updated_at?: Date;
  }
}
