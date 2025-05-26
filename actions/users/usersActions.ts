import {
  UserLoginData,
  UserLoginResponse,
  UserRegisterData,
  UserRegisterResponse,
} from "@/types/users";
import { api } from "../api";
import { redirect } from "next/navigation";
import { toast } from "sonner";

export const registerUser = async (data: UserRegisterData) => {
  try {
    const response = await api.post<UserRegisterResponse>(
      "/auth/register",
      data,
      {}
    );
    const { success, data: resData } = response;
    if (!success) {
      toast.error(resData.message, {
        richColors: true,
        position: "top-center",
      });
      return;
    }
    toast.success(resData.message, {
      richColors: true,
      position: "top-center",
    });
    setTimeout(() => {
      redirect("/login");
    }, 1500);
  } catch (err: any) {
    const errorMsg =
      err.response?.data?.message || "Error del servidor. Intenta más tarde.";
    toast.error(errorMsg, {
      richColors: true,
      position: "top-center",
    });
    console.error(err);
  }
};

export const loginUser = async (data: UserLoginData) => {
  try {
    const response = await api.post<UserLoginResponse>("/auth/login", data, {});
    const { success, data: resData } = response;

    if (!success) {
      toast.error(resData.message, {
        richColors: true,
        position: "top-center",
      });
      return { success: false };
    }

    toast.success(resData.message, {
      richColors: true,
      position: "top-center",
    });
    return { success: true };
  } catch (err: any) {
    const errorMsg =
      err.response?.data?.message || "Error del servidor. Intenta más tarde.";
    toast.error(errorMsg, { richColors: true, position: "top-center" });
    console.error(err);
    return { success: false };
  }
};