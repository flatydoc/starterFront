import { api } from "../../../../core/api";

export const add = (data) => {
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

  return api.post("/tasks/add", data);
};

export const getAll = () => {
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

  return api.get("/tasks/getAll");
};

export const get = (id) => {
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

  return api.get("/tasks/" + id);
};
