import axios from "axios";
import { config } from "config";

//pass new generated access token here
let token = "";

//apply base url for axios
const API_URL = config.planetPressUrl;

const axiosApi = axios.create({
  baseURL: API_URL,
});

axiosApi.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export async function get(url: string, config = {}) {
  return await axiosApi
    .get(url, { ...config })
    .then((response) => response.data);
}

export async function post(
  url: string,
  data: { [key: string]: any | any[] } | any,
  config = {}
) {
  return axiosApi
    .post(url, { ...data }, { ...config })
    .then((response) => response.data);
}

export async function put(
  url: string,
  data: { [key: string]: any | any[] },
  config = {}
) {
  return axiosApi
    .put(url, { ...data }, { ...config })
    .then((response) => response.data);
}

export async function del(url: string, config = {}) {
  return await axiosApi
    .delete(url, { ...config })
    .then((response) => response.data);
}
