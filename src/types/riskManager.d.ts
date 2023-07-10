declare module 'RiskmanagerTypes' {
    export interface RiskmanagerDriver {
      id_modalidade: string;
      documento: string;
      data_nasc: string;
      mae: string;
      nome: string;
      pai: string;
      sexo: string;
      rg: string;
      rg_uf: string;
      rg_emissao: string;
      cnh: string;
      cnh_uf: string;
      cnh_cat: string;
      cnh_first: string;
      cnh_validate: string;
      cnh_security: string;
      telefone: string;
      celular: string;
      email: string;
    }
  
    export interface RiskmanagerVehicle {
      placa: string;
      tipo: string;
      documento: string;
      nome: string;
      renavam: string;
      uf: string;
      checkANTT: string;
    }
  
    export interface RiskmanagerOwner {
      tipo: string;
      id_modalidade: string;
      documento: string;
      data_nasc: string;
      mae: string;
      nome: string;
      pai: string;
      sexo: string;
      rg: string;
      rg_uf: UF;
      rg_emissao: string;
    }
  
    export interface RiskmanagerType {
      vin_id: number;
      principal: RiskmanagerDriver;
      veiculos: RiskmanagerVehicle[];
      proprietarios: RiskmanagerOwner[];
    }
}