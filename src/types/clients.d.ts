declare module "ClientsTypes" {
  export interface Client {
    client_id: number;
    client_name: string;
    client_cnpj: string;
    client_status: string;
    created_at: Date;
    updated_at: Date;
  }
}
