import {
  UserLoginData,
  UserLoginResponse,
  UserRegisterData,
  UserRegisterResponse,
} from "@/types/users";
import { api } from "../api";
import { redirect } from "next/navigation";

export const registerUser = async (data: UserRegisterData) => {
  try{
    await api.post<UserRegisterResponse>("/auth/register", data, {})

    redirect('/')
  } catch {
    console.log("Mamo pero en registro")
  }

};

export const loginUser = async (data: UserLoginData) => {
  try {
    await api.post<UserLoginResponse>("/auth/login", data, {});
    
    redirect('/')
  } catch {
    console.log("mamo")
  }
};
