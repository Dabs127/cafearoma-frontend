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

export interface UserProfileResponse {
    user: {
        _id: string;
        email: string;
        password: string;
        username: string;
        phone: string;
        role: string;
    }
}

export interface UserUpdateBody extends Record<string, unknown> {
    name?: string;
    phone?: string;
    email?: string;
}

export interface UserForgotPasswordBody extends Record<string, unknown> {
    email: string;
}

export interface UserResetPasswordBody extends Record<string, unknown> {
    password: string;
    confirm_password: string;
}

export interface UserUpdateResponse {
    success: boolean;
    message: string;
}

export interface UserDeleteResponse {
    success: boolean;
    message: string;
}

export interface UserLogoutResponse {
    success: boolean;
    message: string;
}

export interface UserForgotPasswordResponse {
    success: boolean;
    message: string;
}

export interface UserResetPasswordResponse {
    success: boolean;
    message: string;
}