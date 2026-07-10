export interface GetListDoulaReviewParams{
    offset: number,
    limit: number,
    page: number,
    f_doulaId: string,
}

export interface UpdateReviewByIdPayload{
    careId: string,
    comment: string,
    expertiseStar: number,
    communicationStar: number,
    punctualityStar: number,
    supportStar: number
}