import { api } from "../../../../core/api";
import { authApi } from "../../../../core/api/authApi";

export const getAll = () => {
  return api.get("/events/getAll");
};

export const get = (id) => {
  return api.get(`/events/${id}`);
};

export const getEventsByUserId = () => {
  return authApi.get("/events/getEventsByUserId");
};

export const addEvent = (data) => {
  return authApi.post("/events/add", data);
};

export const editEvent = (data) => {
  return authApi.put(`/events/edit`, data);
};

export const removeEvent = (id) => {
  return authApi.delete(`/events/${id}`);
};

export const subscribe = (id) => {
  return authApi.put(`/events/subscribe`, id);
};
