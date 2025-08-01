import axios, { AxiosInstance } from "axios";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api",
  withCredentials: true
});

const get = async <T>(
  url: string,
  config: Record<string, unknown>
): Promise<T> => {
  try{
    const response = await axiosInstance.get(url, {
      ...config
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:");
    throw error;
  }

};
const post = async <T>(
  url: string,
  data: Record<string, unknown> | FormData,
  config: Record<string, unknown>
): Promise<T> => {
  try {
    const response = await axiosInstance.post(url, data, {
      ...config
    });
    return response.data;
  } catch (error) {
    console.error("Error posting data");
    throw error;
  }
};
const put = async <T>(
  url: string,
  data: Record<string, unknown>,
  config: Record<string, unknown>
): Promise<T> => {
  try {
    const response = await axiosInstance.put(url, data, {
      ...config
    });
    return response.data;
  } catch (error) {
    console.error("Error putting data");
    throw error;
  }
};
const patch = async <T>(
  url: string,
  data: Record<string, unknown> | FormData,
  config: Record<string, unknown>
): Promise<T> => {
  try {
    const response = await axiosInstance.patch(url, data, config);
    return response.data
  } catch (error) {
    console.error("Error patching data:", error);
    throw error;
  }
}
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
  patch,
  del,
};
