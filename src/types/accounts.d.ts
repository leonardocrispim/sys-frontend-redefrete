declare module 'AccountsTypes' {
  export interface Account {
    account_id?: number;
    account_name: string;
    account_cpf_cnpj: string;
    account_telephone: string;
    account_whatsapp?: string | null;
    account_email: string;
    account_status?: string;
    account_bank_number:string;
    account_bank_agency: string;
    account_bank_account: string;
    account_bank_account_digit: string;
    address_zip_code?: string | null;
    address_street?: string | null;
    address_number?: string | null;
    address_complement?: string | null;
    address_district?: string | null;
    address_city?: string | null;
    address_state?: string | null;
    created_by: number | null | undefined;
    created_at?: string;
    updated_at?: string;
  }

  export interface Account_Address {
    account_id?: number;
    account_name: string;
    account_cpf_cnpj: string;
    account_telephone: string;
    account_whatsapp?: string | null;
    account_email: string;
    account_status?: string;
    created_by: number | null | undefined;
    created_at?: string;
    updated_at?: string;
    rd_account_meta: {
      address_street: string;
      address_number: string;
      address_complement: string | null;
      address_city: string;
      address_state: string;
      address_zip_code: string;
      address_district: string;
      account_bank_number?:string;
      account_bank_agency?: string;
      account_bank_account?: string;
      account_bank_account_digit?: string;
    };
  }
  export interface AccountsSearchData {
    account_status?: string;
    take?: number;
    skip?: number;
    s?: string;
  }
}
