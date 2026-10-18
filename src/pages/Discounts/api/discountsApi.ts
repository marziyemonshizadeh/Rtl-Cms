import type Discount from "../models/discount";
import apiRequests from "@/services/configs/axios";
import { endpoints } from "@/services/shared/endpoints";

export const discountsApi = {
  async list(): Promise<Discount[]> {
    return (await apiRequests.get<Discount[]>(endpoints.discounts)).data;
  },
  async remove(id: number): Promise<number> {
    await apiRequests.delete(`${endpoints.discounts}/${id}`);
    return id;
  },
  async setConfirmation(id: number, confirmation: boolean): Promise<Discount> {
    return (await apiRequests.patch<Discount>(`${endpoints.discounts}/${id}`, { confirmation })).data;
  },
};
