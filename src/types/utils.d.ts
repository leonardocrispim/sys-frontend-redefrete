declare module 'UtilsTypes' {
  export interface ApiReturn<T> {
    return: 'success' | 'error';
    count_total?: number;
    count_items?: number;
    data: T | null | undefined;
    message?: string;
  }
}
