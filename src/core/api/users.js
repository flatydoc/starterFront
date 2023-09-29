import { api } from "./index";

export const makeAuth = (data) => {
  return api.post("/user/login", data);
};

export const logout = () => {
  return api.post("/user/logout");
};

export const createNewUser = (data) => {
  return api.post("/user/registration", data);
};
