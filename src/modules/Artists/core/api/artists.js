import { api } from "../../../../core/api";
import { authApi } from "../../../../core/api/authApi";

export const getAll = () => {
  return api.get("/artists/getAll");
};

export const get = (id) => {
  return api.get(`/artists/${id}`);
};

export const getArtistsByUserId = () => {
  return authApi.get("/artists/getArtistsByUserId");
};

export const addArtist = (data) => {
  return authApi.post("/artists/add", data);
};

export const addArtists = (data) => {
  return authApi.post("/artists/addList", data);
};

export const editArtist = (data) => {
  return authApi.put(`/artists/edit`, data);
};

export const removeArtist = (id) => {
  return authApi.delete(`/artists/${id}`);
};

export const subscribe = (id) => {
  return authApi.put(`/artists/subscribe`, id);
};
