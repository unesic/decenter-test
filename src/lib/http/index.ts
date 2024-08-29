import axios from "axios";

const httpService = axios.create({ baseURL: "https://api.etherscan.io" });

httpService.interceptors.request.use((config) => {
  config.params = {
    ...config.params,
    apiKey: import.meta.env.VITE_APP_ETHERSCAN_API_KEY,
  };
  return config;
});

export default httpService;

export * from "./actions";
