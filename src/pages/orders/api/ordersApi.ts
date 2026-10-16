import type Order from "@/models/orderType";
import apiRequests from "@/services/configs/axios";
import { endpoints } from "@/services/shared/endpoints";

export const ordersApi = {
  async list(): Promise<Order[]> {
    return (await apiRequests.get<Order[]>(endpoints.orders)).data;
  },
  async remove(id: number): Promise<number> {
    await apiRequests.delete(`${endpoints.orders}/${id}`);
    return id;
  },
  async setConfirmation(id: number, confirmation: boolean): Promise<Order> {
    return (await apiRequests.patch<Order>(`${endpoints.orders}/${id}`, { confirmation })).data;
  },
};
