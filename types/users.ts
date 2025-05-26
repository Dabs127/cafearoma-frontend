export interface User {
  username: string;
  email: string;
  password: string;
  phone: string;
}

export interface UserRegisterData extends Record<string, unknown> {
    username: string;
    email: string;
    password: string;
    phone: string;
}

export interface UserRegisterResponse {
    success: boolean,
    data: {
        message: string,
        userId?: number,
        email?: string,
    }
}

export interface UserLoginData extends Record<string, unknown> {
    email: string;
    password: string;
}

export interface UserLoginResponse {
    success: boolean,
    data: {
        userId?: string;
        email?: string;
        message?: string;
    }
}