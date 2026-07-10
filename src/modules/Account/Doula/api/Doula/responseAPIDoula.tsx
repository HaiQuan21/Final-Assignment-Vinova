export interface GetListOfDoulaResponse{
    message: string,
    data: [
      {
        id: string,
        title: string,
        status: string,
        user: {
          fullName: string,
          firstName: string,
          middleName: string | null,
          lastName: string,
          birthDate: string,
          email: string,
          countryCode: string,
          phoneNumber: string,
          lastAccess: string,
        },
        address: {
          id: string,
          fullAddress: string
        },
        picture: {
          id: string,
          uri: string,
          type: string,
          metadata: {
            thumbnail: {
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
      }],
    metadata: {
      page: number,
      limit: number,
      totalPages: number,
      totalCount: number,
      hasNextPage: boolean
    }
  }

export interface GetDoulaDetailByIdResponse{
  message: "Success",
  data: {
    id: "9e3cdb77-58e7-4624-8395-be52b0155910",
    title: "super otis",
    description: "hihiihh",
    businessName: null,
    status: "active",
    photos: [
      id: string,
      media:{
        createdAt: string,
        id: string,
        metadata:{
          medium:{
            key: string,
            uri: string
          },
          thumbnail:{
            key: string,
            uri: string
          }
        },
        type: string,
        uri: string
      }
    ],
    qualifications: string,
    createdAt: string,
    updatedAt: string,
    deletedAt: null,
    cometChatUid: string,
    deletedBy: string,
    isTrialed: string,
    user: {
      fullName: string,
      firstName: string,
      middleName: null,
      lastName: string,
      picture: null,
      birthDate: string
      email: string,
      countryCode: string,
      phoneNumber: string,
      lastAccess: string,
    },
    categories: [
      {
        id: string,
        picture: {
          createdAt: string,
          id: string,
          metadata:{
            medium:{
              key: string,
              uri: string,
            },
            thumbnail:{
              key: string,
              uri: string,
            }
          },
          type:string,
          uri: string,
        },
        name: string,
        title: string
      }
    ],
    address: {
      id: string,
      fullAddress: string
    },

  }
}
