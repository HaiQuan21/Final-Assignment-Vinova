import { type Category } from "../../../constants/MainObjectClass"

export interface CreateCategoriesResponse{
    message: string,
    data: [
      Category,
      deletedAt: string | null
    ]
  }

export interface GetAllCategoriesResponse{
    message: string,
    data: [
       Category
    ],
    metadata: {
    page: number,
    limit: number,
    totalPages: number,
    totalCount: number,
    hasNextPage: boolean
  }
}

export interface GetCategoriesByIdResponse{
    message: string,
    data: {
      id: string,
      slug: string,
      title: string,
      picture: string,
      content: string,
      status: string,
      type: string,
      authorId: string,
      categoryId: string,
      timeToRead: number,
      createdAt: string,
      updatedAt: string,
      category: {
        id: string,
        name: string
      },
      author: {
        id: string,
        firstName: string,
        lastName: string
      }
    }
  }