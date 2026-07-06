
export interface GetListOfDoulasParams{
    search: string,
    sort: string,
    page: number,
    limit: number,
    offset: number,
}

export interface UpdateDoulaPayload{
    user: {
        countryCode: string,
        phoneNumber: string
    },
    deletedPhotos: [
        string
    ],
    newPhotos: [
        string
    ],
    title: string,
    description: string,
    qualifications: [
        string
    ],
    categoryIds: [
        string
    ],
    businessName: string,
    status: string
}