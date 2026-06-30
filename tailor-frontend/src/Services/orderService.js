import api from "./api";

export const getOrders = () => api.get("/Orders/Get_Orders");
export const createOrder = (data) => api.post("/Orders", data);
export const deleteOrder = (id) => api.delete(`/Orders/${id}`);
export const updateOrder = (data) => api.put("/Orders/update", data);

export const getOrderCustomers = () => api.get("/Orders/customers");
export const getOrderTailors = () => api.get("/Orders/tailors");
