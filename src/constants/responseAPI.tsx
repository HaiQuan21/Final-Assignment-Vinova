import { type Admin } from "./MainObjectClass";

export interface LoginResponse {
    message: string;
    data: {
      admin: Admin;
      tokens: {
        accessToken: string;
        refreshToken: string;
      };
    };
  }



