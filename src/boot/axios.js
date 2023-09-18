import { boot } from "quasar/wrappers";
import axios from "axios";

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({
  baseURL: "http://worldtimeapi.org",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    // "Access-Control-Allow-Origin": "*",
    // "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    // "Access-Control-Allow-Headers": "*",
  },
});
const aladhanApi = axios.create({
  baseURL: "http://api.aladhan.com/v1",
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    // "Access-Control-Allow-Origin": "*",
    // Accept: "application/json",
    // "Content-Type": "application/json",
    // "Access-Control-Allow-Origin": "*",
    // "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    // "Access-Control-Allow-Headers": "Content-Type, x-requested-with",
  },
});

const apiNinjas = axios.create({
  baseURL: "https://api.api-ninjas.com/v1",
  headers: {
    Accept: "application/json",
    "X-Api-Key": "Q/51lh3Og5gYuJJNKxWtCg==5kcKKiHwuQL4Vwv1",
    "Content-Type": "application/json",
    // "Access-Control-Allow-Origin": "*",
    // "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    // "Access-Control-Allow-Headers": "Content-Type, x-requested-with",
  },
});

const countriesnow = axios.create({
  baseURL: "https://countriesnow.space/api/v0.1",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    // "Access-Control-Allow-Origin": "*",
    // "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    // "Access-Control-Allow-Headers": "Content-Type, x-requested-with",
  },
});

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  app.config.globalProperties.$aladhanApi = aladhanApi;
  app.config.globalProperties.$apiNinjas = apiNinjas;

  app.config.globalProperties.$countriesnow = countriesnow;

  // ^ ^ ^ this will allow you to use this.$aladhanApi (for Vue Options API form)
  //       so you can easily perform requests against your app's API
});

export { api, aladhanApi, apiNinjas, countriesnow };
