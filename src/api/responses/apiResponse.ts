export type ApiResponse<Data> = {
  statusCode: number;
  method: 'GET' | 'POST' | 'DELETE' | 'UPDATE';
  message: string;
  error: boolean;
  data: Data;
};
