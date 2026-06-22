import { type Admin, type Article, type Voucher } from "./MainObjectClass";

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

export interface CreateArticleResponse{
    message: string;
    data: Article
}

export interface GetAllArticleResponse{
  message: string;
  data: [Article],
  metadata:{
    page: number,
    limit: number,
    totalPages: number,
    totalCount: number,
    hasNextPage: boolean
  }
}

export interface GetArticleById{
  message: string,
  data: {
    id: string,
    slug: string,
    title: string,
    content: string,
    status: string,
    type: string,
    author: string,
    categoryId: string,
    timeToRead: number,
    createdAt: string,
    updatedAt: string,
    category: {
      id: string,
      name: string
    },
    picture: {
      id: string,
      uri: string,
      type: string,
      metadata: {
        thumb: {
          uri: string,
          key: string
        },
        medium: {
          uri: string,
          key: string
        }
      },
      createdAt: string
    }
  }
}

export interface CreateVoucherResponse{
  message: string,
  data: Voucher
}

export interface GetVoucherResponse{
  message: string,
  data: [
    Voucher
  ]
  metadata: {
    page: number,
    limit: number,
    totalPages: number,
    totalCount: number,
    hasNextPage: boolean
  }
}

export interface GetVoucherByIdResponse{
  message: string,
  data: Voucher
}