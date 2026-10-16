import { isAxiosError } from "axios";

export function getApiError(error: unknown): string {
  if (isAxiosError(error)) {
    if (!error.response) return "ارتباط با سرور برقرار نشد. دوباره تلاش کنید.";
    if (error.response.status === 404) return "رکورد مورد نظر یافت نشد.";
  }
  return "درخواست انجام نشد. دوباره تلاش کنید.";
}
