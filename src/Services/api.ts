import axios from "axios";
export const Api = axios.create({
  baseURL: "https://api.fariasx.online",
  timeout: 10000,
});
