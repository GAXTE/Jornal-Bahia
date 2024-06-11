import axios from "axios";
export const Api = axios.create({
  baseURL: "https://fariasx.online",
  timeout: 5000,
});
