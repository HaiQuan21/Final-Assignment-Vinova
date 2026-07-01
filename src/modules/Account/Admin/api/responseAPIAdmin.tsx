export interface CreateAdminResponse{
    message: string,
    data: {
      id: string,
      username: string,
      firstName: string,
      lastName: string,
      status: string,
      picture: string,
      email: string,
      role: string,
      picture2: {
        id: string,
        converted: boolean,
        uri: string,
        type: string,
        resourceId: string,
        updatedAt: string,
        createdAt: string,
        metadata: string | null,
        deletedAt: string | null
      },
      updatedAt: string,
      createdAt: string
    }
  }

export interface GetAllAdminResponse{
    message: string,
    data: [
      {
        id: string,
        username: string,
        firstName: string,
        lastName: string,
        role: string,
        status: string,
        email: string,
        picture: string,
        createdAt: string,
        updatedAt: string,
        picture2: {
          id: string,
          uri: string,
          type: string,
          metadata: string | null,
          createdAt: string
        }
      }
    ],
    metadata: {
      page: number,
      limit: number,
      totalPages: number,
      totalCount: number,
      hasNextPage: boolean
    }
  }

  export interface GetAdminByIdResponse{
    message: string,
    data: {
      id: string,
      username: string,
      firstName: string,
      lastName: string,
      role: string,
      status: string,
      email: string,
      picture: string,
      createdAt: string,
      updatedAt: string,
      picture2: {
        id: string,
        uri: string,
        type: string,
        metadata: string | null,
        createdAt: string
      }
    }
  }

export interface UpdateAdminByIdResponse{
    "message": "Success",
    "data": true
}