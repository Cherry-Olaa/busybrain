// src/lib/studentApi.ts
import api from "@/lib/api";
export const getStudents = (params?: any) => api.get("/students", { params });
export const createStudent = (payload: any) => api.post("/students", payload);
export const updateStudent = (id: string, payload: any) => api.put(`/students/${id}`, payload);
export const deleteStudent = (id: string) => api.delete(`/students/${id}`);