import type Product from "@/models/productType";
import apiRequests from "@/services/configs/axios";
import { endpoints } from "@/services/shared/endpoints";

export const productsApi = {
  async list(): Promise<Product[]> {
    return (await apiRequests.get<Product[]>(endpoints.products)).data;
  },
  async remove(id: number): Promise<number> {
    await apiRequests.delete(`${endpoints.products}/${id}`);
    return id;
  },
  async create(values: Omit<Product, "id">): Promise<Product> {
    return (await apiRequests.post<Product>(endpoints.products, values)).data;
  },
  async update(id: number, changes: Omit<Product, "id">): Promise<Product> {
    return (await apiRequests.patch<Product>(`${endpoints.products}/${id}`, changes)).data;
  },
};
