// ─── Auth ────────────────────────────────────────────────────────────────────
export interface LoginPayload {
    username: string;
    password: string;
  }
  
  export interface RefreshTokenPayload {
    refreshToken: string;
  }

  export interface GetCategoriesParams{
    page?: number;
    limit?: number;
    offset?: number;
    search?: number;
    sort?: string;
    f_name?: string;
  }

