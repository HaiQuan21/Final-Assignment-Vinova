export interface GetListClientParams{
    search:string,
    sort:string,
    page: number,
    limit: number,
    offset: number,
    f_email: string,
    f_firstname: string,
    f_lastname: string,
    f_status: string,
    f_phoneNumber: string,
    embed: string
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