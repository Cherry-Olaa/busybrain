// src/lib/resultApi.ts
import api from "@/lib/api";

export const uploadSingleResult = (payload: any) => api.post("/result/single", payload);
export const uploadMultipleResults = (payload: any) => api.post("/result/multiple", payload);
export const uploadExcelFile = (file: File) => {
  const form = new FormData();
  form.append("file", file);
  return api.post("/result/excel", form, { headers: { "Content-Type": "multipart/form-data" } });
};
export const getResults = (params?: any) => api.get("/results", { params });