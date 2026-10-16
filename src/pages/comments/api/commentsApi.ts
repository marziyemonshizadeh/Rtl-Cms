import type Comment from "@/models/commentType";
import apiRequests from "@/services/configs/axios";
import { endpoints } from "@/services/shared/endpoints";

export const commentsApi = {
  async list(): Promise<Comment[]> {
    return (await apiRequests.get<Comment[]>(endpoints.comments)).data;
  },
  async remove(id: number): Promise<number> {
    await apiRequests.delete(`${endpoints.comments}/${id}`);
    return id;
  },
  async setConfirmation(id: number, confirmation: boolean): Promise<Comment> {
    return (await apiRequests.patch<Comment>(`${endpoints.comments}/${id}`, { confirmation })).data;
  },
};
