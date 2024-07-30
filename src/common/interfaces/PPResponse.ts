export interface PPResponse<T=any> {
  result: string;
  message: string;
  data?: T|any
}
