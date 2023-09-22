import { api } from "../../../../core/api";

export const getAll = () => {
  return api.get("/events/getAll");
};

export const get = (id) => {
  return api.get(`/events/${id}`);
};

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

  return api.post("/events/add", data);
};

export const edit = (data) => {
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

  return api.put(`/events/edit`, data);
};

export const remove = (id) => {
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

  return api.delete(`/events/${id}`);
};

export const subscribe = (id) => {
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

  return api.put(`/events/subscribe`, id);
};
