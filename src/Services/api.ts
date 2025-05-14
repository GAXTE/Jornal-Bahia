import axios from "axios";
export const Api = axios.create({
  baseURL: "https://api.jornaldabahia.ba/",
  timeout: 10000,
});
