export interface GetListOfDoulaResponse{
    message: string,
    "data": [
      {
        id: "a62e64ce-ad2e-43d4-b53b-159cfaa382ac",
        title: "Do not choose me",
        status: "active",
        user: {
          fullName: "Dylan Doula",
          firstName: "Dylan",
          middleName: string | null,
          lastName: "Doula",
          birthDate: "2006-08-02T00:00:00.000Z",
          email: "dylan+doula@vinova.com.sg"
        },
        address: {
          id: "ea0fc060-379e-4722-8ea5-b44042f9e610",
          fullAddress: "33 Union Street, KYABRAM VIC 3620"
        },
        picture: {
          id: "c8753b6f-2230-44d0-a794-d039ddcb1b48",
          uri: "https://s3.ap-southeast-1.amazonaws.com/nurturewave-be-dev/uploads%2Fimages%2Ffafff79b-025e-4681-bb5d-fbf73b38364d_image_picker_35FE64CC-EC10-439F-BE32-419B6F57BF1F-5526-0000051D46A0AE26.jpg",
          type: "images",
          metadata: {
            thumbnail: {
              uri: "https://s3.ap-southeast-1.amazonaws.com/nurturewave-be-dev/uploads/images/75e95faf-dd7b-4eda-99ac-226f05d90fc4_thumbnail.jpeg",
              key: "uploads/images/75e95faf-dd7b-4eda-99ac-226f05d90fc4_thumbnail.jpeg"
            },
            medium: {
              uri: "https://s3.ap-southeast-1.amazonaws.com/nurturewave-be-dev/uploads/images/8097a5e0-3763-4482-b9c6-57579e986a24_medium.jpeg",
              key: "uploads/images/8097a5e0-3763-4482-b9c6-57579e986a24_medium.jpeg"
            }
          },
          createdAt: "2024-08-06T09:11:08.114Z"
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