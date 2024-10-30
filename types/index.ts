export interface APISuccessResponse<T> {
  message: string;
  data?: T;
}

export interface APIErrorResponse {
  error: string;
}
