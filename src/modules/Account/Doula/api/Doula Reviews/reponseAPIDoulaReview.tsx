export interface GetDoulaReviewListResponse{
    message: string,
    data: [
      {
        id: string,
        doulaId: string,
        userId: string,
        comment: string,
        start: number,
        expertiseStar: number,
        communicationStar: number,
        punctualityStar: number,
        supportStar: number,
        createdAt: string,
        updatedAt: string,
        user: {
          fullName: string,
          firstName: string,
          middleName: string | null,
          lastName: string,
          picture: string
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

export interface GetDoulaReviewStarResponse{
    message: string,
    data: {
      id: string,
      title: string,
      description: string,
      businessName: string,
      starAvg: number,
      status: string,
      qualifications: [],
      stripeCustomerId: string,
      isTrialed: boolean,
      createdAt: string,
      updatedAt: string,
      avgStart: null,
      avgExpertiseStar: null,
      avgCommunicationStar: null,
      avgPunctualityStar: null,
      avgSupportStar: null,
      totalReview: string
    }
  }

export interface GetReviewDetailResponse{
    message: string,
    data: {
      id: string,
      careId: string,
      comment: string,
      expertiseStar: number,
      communicationStar: number,
      punctualityStar: number,
      supportStar: number,
      userId: string,
      start: number,
      doulaId: string,
      updatedAt: string,
      createdAt: string,
      deletedAt: string | null
    }
  }