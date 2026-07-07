export interface GetListClientsResponse{
    message: string,
    data: {
            fullName: string,
            id: string,
            firstName: string,
            middleName: string | null,
            lastName: string,
            birthDate: string,
            email: string,
            phoneNumber: string | null,
            googleId: string | null,
            appleId: string | null,
            status: string,
            verifiedEmail: boolean,
            countryCode: string | null,
            verifiedPhoneNumber: boolean,
            updatedBy: string,
            deletedBy: string,
            deActiveAt: string | null,
            isExternal: boolean,
            createdAt: string,
            updatedAt: string,
            address: {
              fullAddress: string
            },
            picture: {
              id: string,
              uri: string,
              type: string,
              metadata: {
                thum: {
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
          },
    metadata: {
    page: number,
    limit: number,
    totalPages: number,
    totalCount: number,
    hasNextPage: boolean
  }
}

export interface GetClientByIdResponse{
    fullName: string,
    id: string,
    firstName: string,
    middleName: string | null,
    lastName: string,
    birthDate: string,
    email: string,
    phoneNumber: string | null,
    googleId: string | null,
    appleId: string | null,
    status: string,
    verifiedEmail: boolean,
    countryCode: string | null,
    verifiedPhoneNumber: boolean,
    updatedBy: string,
    deletedBy: string,
    deActiveAt: string | null,
    isExternal: boolean,
    createdAt: string,
    updatedAt: string,
    address: {
      fullAddress: string
    },
    picture: {
      id: string,
      uri: string,
      type: string,
      metadata: {
        thum: {
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

export interface EditClientByIdResponse{

}