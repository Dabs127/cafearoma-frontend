import axios, { AxiosInstance } from "axios";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

const get = async <T>(
  url: string,
  config: Record<string, unknown>
): Promise<T> => {
  try{
    const response = await axiosInstance.get(url, config);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }

};
const post = async <T>(
  url: string,
  data: Record<string, unknown>,
  config: Record<string, unknown>
): Promise<T> => {
  try {
    const response = await axiosInstance.post<T>(url, data, config);
    return response.data;
  } catch (error) {
    console.error("Error posting data:", error);
    throw error;
  }
};
const put = async <T>(
  url: string,
  data: Record<string, unknown>,
  config: Record<string, unknown>
): Promise<T> => {
  try {
    const response = await axiosInstance.put(url, data, config);
    return response.data;
  } catch (error) {
    console.error("Error putting data:", error);
    throw error;
  }
};
const del = async <T>(
  url: string,
  config: Record<string, unknown>
): Promise<T> => {
  try {
    const response = await axiosInstance.delete(url, config);
    return response.data;
  } catch (error) {
    console.error("Error deleting data:", error);
    throw error;
  };
};

export const api = {
  get,
  post,
  put,
  del,
};
