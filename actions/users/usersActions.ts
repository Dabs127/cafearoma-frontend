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
  UserUpdateBody,
  UserUpdateResponse,
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

export const logoutUser = async () => {
  try {
    const response: UserLogoutResponse = await api.post(
      "/auth/logout",
      { data: {} },
      {}
    );
    const { success, message } = response;
    if (!success) {
      console.log("paso algo aqui");
      toast.error(message, {
        richColors: true,
        position: "top-center",
      });
      return;
    }

    localStorage.removeItem("session-store");

    toast.success(message, {
      richColors: true,
      position: "top-center",
    });
    setTimeout(() => {
      redirect("/login");
    }, 1000);
  } catch (err: any) {
    const errorMsg =
      err.response?.data?.message || "Error del servidor. Intenta más tarde.";
    toast.error(errorMsg, { richColors: true, position: "top-center" });
    console.error(err);
  }
};

export const updateUserProfile = async (data: UserUpdateBody) => {
  try {
    const response: UserUpdateResponse = await api.put("/user", data, {});
    const { success, message } = response;

    if (!success) {
      toast.error(message, {
        richColors: true,
        position: "top-center",
      });
      return;
    }

    toast.success(message, {
      richColors: true,
      position: "top-center",
    });
  } catch (err: any) {
    const errorMsg =
      err.response?.data?.message || "Error del servidor. Intenta más tarde.";
    toast.error(errorMsg, { richColors: true, position: "top-center" });
    console.error(err);
  }
};

export const deleteUserProfile = async (id: string | number) => {
  console.log("Deleting user with ID:", id);
  try {
    const response: UserDeleteResponse = await api.del("/user", {
      data: { id },
    });
    const { success, message } = response;

    if (!success) {
      toast.error(message, {
        richColors: true,
        position: "top-center",
      });
      return;
    }

    toast.success(message, {
      richColors: true,
      position: "top-center",
    });
    setTimeout(() => {
      redirect("/login");
    }, 1500);
  } catch (err: any) {
    const errorMsg =
      err.response?.data?.message || "Error del servidor. Intenta más tarde.";
    toast.error(errorMsg, { richColors: true, position: "top-center" });
    console.error(err);
  }
};

export const forgotPassword = async (data: UserForgotPasswordBody) => {
  try {
    const { success, message }: UserForgotPasswordResponse = await api.post(
      "/auth/forgot-password",
      data,
      {}
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
    return { success };
  } catch(err: any) {
    const errorMsg =
      err.response?.data?.message || "Error del servidor. Intenta más tarde.";
    toast.error(errorMsg, { richColors: true, position: "top-center" });
    console.error(err);
    return { success: false };
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
    console.error(err);
    return { success: false };
  }
};
