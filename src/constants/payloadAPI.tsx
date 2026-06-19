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