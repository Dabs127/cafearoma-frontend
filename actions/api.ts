import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api",
});

const get = async (url: string, config: Record<string, unknown>) => {
    return axiosInstance.get(url, config);
};
const post = async (url: string, data: Record<string, unknown>, config: Record<string, unknown>) => {
    return axiosInstance.post(url, data, config);
}
const put = async (url: string, data: Record<string, unknown>, config: Record<string, unknown>) => {
    return axiosInstance.put(url, data, config);
}
const del = async (url: string, config: Record<string, unknown>) => {
    return axiosInstance.delete(url, config);
}

export const api = {
    get,
    post,
    put,
    del
};