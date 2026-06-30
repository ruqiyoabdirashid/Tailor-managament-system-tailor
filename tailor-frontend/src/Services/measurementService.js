import api from "./api";

export const getMeasurements = () => api.get("/Measurements/Get_Measurements");

export const createMeasurement = (data) => api.post("/Measurements", data);
export const updateMeasurement = (data) => api.put("/Measurements/UpdateMeasuremet", data);
export const deleteMeasurement = (id) => api.delete(`/Measurements/${id}`);

// Used to populate Order dropdown for measurements
export const getMeasurementOrders = () => api.get("/Measurements/orders");
