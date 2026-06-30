import api from "./api";

export const getTailors = () => api.get("/Tailors/Get_Tailor");

export const createTailor = (data) => api.post("/Tailors", data);

export const updateTailor = (_id, data) => api.put("/Tailors/UpdateTailor", data);
export const deleteTailor = (id) => api.delete(`/Tailors/${id}`);
