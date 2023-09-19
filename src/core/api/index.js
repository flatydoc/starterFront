import axios from "axios";
import { config } from "../configs/config";

export const api = axios.create({
  baseURL: config.baseURL,
  withCredentials: true,
  headers: {
    "Content-type": "application/json",
  },
});
