// ─── Auth ────────────────────────────────────────────────────────────────────
export interface LoginPayload {
    username: string;
    password: string;
  }
  
  export interface RefreshTokenPayload {
    refreshToken: string;
  }

// ─── Articles ─────────────────────────────────────────────────────────────────
export interface CreateArticlePayload {
    title: string;
    content: string;
    picture: string;
    status: string;
    type: string;
    timeToRead: number;
    categoryId: string;
    author: string;
  }
  
  export interface UpdateArticlePayload {
    title: string;
    content: string;
    picture: string;
    status: string;
    type: string;
    timeToRead: number;
    categoryId: string;
  }

// ─── Vouchers ─────────────────────────────────────────────────────────────────
  export interface VoucherPayload {
    code: string;
    description: string;
    startDate: string;
    endDate: string;
    status: string;
    type: string;
    amount: number;
    quantityUse: number;
    minPayAmount: number;
    maxDiscountAmount: number;
  }

  export interface GetVouchersParams{
    page?: number;
    limit?: number;
    offset?: number;
    search?: number;
    sort?: string;
    f_code?: string;
    f_status?: "active" | "inactive" | "expired";
    f_type?: "fixed" | "percent";
  }

  export interface GetArticlesParams{
    page?: number;
    limit?: number;
    offset?: number;
    search?: number;
    sort?: string;
    f_type?: "article" | "pd";
    f_categoryId?: string,
    f_status?: "published" | "unpublished" | "draft";
  }

  export interface GetCategoriesParams{
    page?: number;
    limit?: number;
    offset?: number;
    search?: number;
    sort?: string;
    f_name?: string;
  }