import type User from "../AddUser/Models/UserModel";
import apiRequests from "@/services/configs/axios";
import { endpoints } from "@/services/shared/endpoints";

export const usersApi = {
  async list(): Promise<User[]> {
    return (await apiRequests.get<User[]>(endpoints.users)).data;
  },
  async remove(id: number): Promise<number> {
    await apiRequests.delete(`${endpoints.users}/${id}`);
    return id;
  },
  async update(id: number, changes: Omit<User, "id">): Promise<User> {
    return (await apiRequests.patch<User>(`${endpoints.users}/${id}`, changes)).data;
  },
};
