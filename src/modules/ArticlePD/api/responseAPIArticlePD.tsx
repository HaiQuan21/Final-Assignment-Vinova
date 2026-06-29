import { type ArticlePD } from "../../../constants/MainObjectClass";
export interface CreateArticlePDResponse{
    message: string;
    data: ArticlePD
}

export interface GetAllArticlePDResponse{
  message: string;
  data: [ArticlePD],
  metadata:{
    page: number,
    limit: number,
    totalPages: number,
    totalCount: number,
    hasNextPage: boolean
  }
}

export interface GetArticlePDById{
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