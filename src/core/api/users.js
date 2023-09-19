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

export const getUsers = () => {
  api.interceptors.request.use((config) => {
    const data = JSON.parse(localStorage.getItem("userData"));
    config.headers.Authorization = `Bearer ${data.accessToken}`;
    return config;
  });

  api.interceptors.response.use(
    (config) => {
      return config;
    },
    async (error) => {
      if (error.response.status === 401) {
        console.log("401");
      }
    }
  );

  return api.get("/user/getUsers");
};
