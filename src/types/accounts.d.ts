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
    created_by: number | null | undefined;
    created_at?: string;
    updated_at?: string;
  }
  export interface AccountsSearchData {
    account_status?: string;
    take?: number;
    skip?: number;
    s?: string;
  }
}
