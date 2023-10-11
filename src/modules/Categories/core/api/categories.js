import { api } from "../../../../core/api";

export const getCategories = () => {
  return api.get("/categories/getAll");
};
