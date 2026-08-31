import { api } from "@/lib/api";
import {
  Category,
  EquipmentDetail,
  EquipmentFilterParams,
  EquipmentListItem,
  PaginatedResponse,
} from "@/types";

export const equipmentService = {
  async getCategories(): Promise<Category[]> {
    const res = await api.get<PaginatedResponse<Category> | Category[]>("/equipment/categories/");
    if (Array.isArray(res)) return res;
    return res.results || [];
  },

  async getEquipmentList(params?: EquipmentFilterParams): Promise<PaginatedResponse<EquipmentListItem>> {
    return api.get<PaginatedResponse<EquipmentListItem>>("/equipment/", params);
  },

  async getEquipmentDetail(idOrSlug: string | number): Promise<EquipmentDetail> {
    return api.get<EquipmentDetail>(`/equipment/${idOrSlug}/`);
  },

  async createEquipment(data: FormData | Record<string, any>): Promise<EquipmentDetail> {
    return api.post<EquipmentDetail>("/equipment/", data);
  },

  async updateEquipment(id: number, data: FormData | Record<string, any>): Promise<EquipmentDetail> {
    return api.patch<EquipmentDetail>(`/equipment/${id}/`, data);
  },

  async deleteEquipment(id: number): Promise<void> {
    return api.delete(`/equipment/${id}/`);
  },

  async getMyEquipment(): Promise<EquipmentListItem[] | PaginatedResponse<EquipmentListItem>> {
    return api.get("/equipment/my_equipment/");
  },

  async uploadImage(equipmentId: number, formData: FormData): Promise<any> {
    return api.post(`/equipment/${equipmentId}/upload_image/`, formData);
  },
};
