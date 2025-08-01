import {
  UserDeleteResponse,
  UserForgotPasswordBody,
  UserForgotPasswordResponse,
  UserLoginData,
  UserLoginResponse,
  UserLogoutResponse,
  UserProfileResponse,
  UserRegisterData,
  UserRegisterResponse,
  UserResetPasswordResponse,
  UserSendEmailToAdminBody,
  UserSendEmailToAdminResponse,
  UserUpdateBody,
  UserUpdateResponse,
} from "@/types/users";
import { api } from "../api";
import { redirect } from "next/navigation";
import { toast } from "sonner";
import { getTranslations } from "next-intl/server";

export const registerUser = async (
  data: UserRegisterData
): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await api.post<UserRegisterResponse>(
      "/auth/register",
      data,
      {}
    );
    const { success, data: resData } = response;

    return { success, message: resData.message };
  } catch (err: any) {

    return {
      success: false,
      message:
        err.response?.data?.message || "Error del servidor. Intenta más tarde.",
    };
  }
};

export const loginUser = async (data: UserLoginData) => {
  try {
    const response = await api.post<UserLoginResponse>("/auth/login", data, {});
    const { success, data: resData } = response;

    return { success, message: resData.message };
  } catch (err: any) {
    return { success: false };
  }
};

export const getUserProfile = async () => {
  try {
    const response: UserProfileResponse = await api.get("/user/profile", {});
    const userData = response.user;
    return { user: userData };
  } catch (err: any) {
    const errorMsg =
      err.response?.data?.message || "Error del servidor. Intenta más tarde.";
    toast.error(errorMsg, { richColors: true, position: "top-center" });
    console.error(err);
    return null;
  }
};

export const logoutUser = async (): Promise<{
  success: boolean;
  message: string;
}> => {
  try {
    const { success, message }: UserLogoutResponse = await api.post(
      "/auth/logout",
      { data: {} },
      {}
    );

    localStorage.removeItem("session-store");

    return { success, message };
  } catch (err: any) {
    const errorMsg =
      err.response?.data?.message || "Error del servidor. Intenta más tarde.";
    console.error(err);

    return { success: false, message: errorMsg };
  }
};

export const updateUserProfile = async (
  data: UserUpdateBody
): Promise<{ success: boolean; message: string }> => {
  try {
    const response: UserUpdateResponse = await api.put("/user", data, {});
    const { success, message } = response;

    return { success, message };
  } catch (err: any) {
    const errorMsg =
      err.response?.data?.message || "Error del servidor. Intenta más tarde.";
    return { success: false, message: errorMsg };
  }
};

export const deleteUserProfile = async (
  id: string | number
): Promise<{ success: boolean; message: string }> => {
  console.log("Deleting user with ID:", id);
  try {
    const { success, message }: UserDeleteResponse = await api.del("/user", {
      data: { id },
    });

    return { success, message };
  } catch (err: any) {
    const errorMsg =
      err.response?.data?.message || "Error del servidor. Intenta más tarde.";
    toast.error(errorMsg, { richColors: true, position: "top-center" });
    console.error(err);

    return { success: false, message: errorMsg };
  }
};

export const forgotPassword = async (
  data: UserForgotPasswordBody
): Promise<{ success: boolean; message: string }> => {
  try {
    const { success, message }: UserForgotPasswordResponse = await api.post(
      "/auth/forgot-password",
      data,
      {}
    );

    return { success, message };
  } catch (err: any) {
    return {
      success: false,
      message:
        err.response?.data?.message || "Error del servidor. Intenta más tarde.",
    };
  }
};

export const resetPassword = async (
  data: { password: string; confirm_password: string },
  query: { id: string; token: string }
) => {
  try {
    console.log("Resetting password with data:", data, "and query:", query);
    const { success, message } = await api.post<UserResetPasswordResponse>(
      "/auth/reset-password",
      data,
      {
        params: {
          id: query.id,
          token: query.token.toString(), // Ensure token is a string
        },
      }
    );

    if (!success) {
      toast.error(message, {
        richColors: true,
        position: "top-center",
      });
      return { success: false };
    }

    toast.success(message, {
      richColors: true,
      position: "top-center",
    });
    return { success: true };
  } catch (err: any) {
    const errorMsg =
      err.response?.data?.message || "Error del servidor. Intenta más tarde.";
    toast.error(errorMsg, { richColors: true, position: "top-center" });
    return { success: false };
  }
};

export const sendEmailToAdmin = async (
  data: UserSendEmailToAdminBody
): Promise<{ success: boolean; message: string }> => {
  try {
    const { success, message } = await api.post<UserSendEmailToAdminResponse>(
      "user/sendEmailToAdmin",
      data,
      {}
    );

    return { success, message };
  } catch (err: any) {
    return {
      success: false,
      message:
        err.response?.data?.message || "Error del servidor. Intenta más tarde.",
    };
  }
};
