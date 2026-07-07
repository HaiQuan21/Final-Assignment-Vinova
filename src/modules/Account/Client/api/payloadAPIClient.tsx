export interface GetListClientParams{
    search:string,
    sort:string,
    page: number,
    limit: number,
    offset: number,
}

export interface EditClientByIdPayload{
    firstName: string,
    middleName: string,
    lastName: string,
    picture: string,
    birthDate: string,
    email: string,
    phoneNumber: string,
    status: string,
    verifiedEmail: boolean,
    countryCode: string,
    verifiedPhoneNumber: boolean
}