declare module "HubsTypes" {
  import { Client } from "ClientsTypes";
  export interface Hub {
    hub_id: number;
    hub_code: string;
    hub_name: string;
    hub_status: string;
    created_at: Date;
    updated_at: Date;
    rd_clients: Client;
  }
}
