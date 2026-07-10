export interface GetPackageListResponse{
    message: string,
    data: [
      {
        id: string,
        name: string,
        price: string,
        image: string,
        doulaId: string,
        numberOfClients: string,
        picture2: string | null
      }
    ],
    metadata: {
      page: 1,
      limit: 25,
      totalPages: 1,
      totalCount: 2,
      hasNextPage: false
    }
  }

export interface GetPackageDetailsResponse{
    message: string,
    data: {
      id: string,
      doulaId: string,
      name: string,
      price: string,
      description: string,
      shortDescription: string,
      image: string,
      qualifications: [
        string
      ],
      createdAt: string,
      updatedAt: string,
      deletedAt: string | null,
      cares: [
        {
          id: string,
          createdAt: string,
          status: string,
          user: {
            fullName: string,
            lastName: string,
            firstName: string,
            middleName: string | null,
            picture: string,
            email: string,
            status: string,
            picture2: string | null
          }
        }
      ],
      picture2: string | null
    }
  }