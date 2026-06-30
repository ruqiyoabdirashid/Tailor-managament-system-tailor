import api from "./api";

export const getCustomers = () => api.get("/Customers/Get_Customers");

export const createCustomer = (data) => api.post("/Customers", data);

export const updateCustomer = (data) => api.put("/Customers/UpdateCustomer", data);
export const deleteCustomer = (id) => api.delete(`/Customers/${id}`);
