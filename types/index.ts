export interface APISuccessResponse<T> {
  message?: string;
  data?: T;
}

export interface APIPaginatedResponse<T> {
  data: T[];
  pagination: {
    total_records: number;
    total_pages: number;
    current_page: number;
    previous_page: number | null;
    next_page: number | null;
  };
}

export interface APIErrorResponse {
  error: string;
}

export interface ISearchParams {
  [key: string]: string | string[] | undefined;
}

export type PasswordRequirement = 'Min. 8 characters' | 'Number' | 'Symbol';

export type AnalyticsFilterRange = '7d' | '30d' | '60d' | '90d';
