declare module 'UsersTypes' {
  import { Hub } from 'HubsTypes';

  export interface UserHubsVin {
    vin_id: number;
    user_id: number;
    hub_id: number;
    created_at: Date;
    updated_at: Date;
    rd_hubs: Hub;
  }

  export interface User {
    user_id: number;
    user_type: 'ADMIN' | 'OPERADOR' | 'DISPATCHER';
    name: string;
    email: string;
    password: string;
    created_at: Date;
    updated_at: Date;
    rd_vin_users_hubs?: UserHubsVin[];
  }
}
