export interface CreateAdminPayload{
    username: string,
    password: string,
    firstName: string,
    lastName: string,
    status: string,
    picture: string,
    email: string
}

export interface GetAllAdminParams{
    page: number,
    limit: number,
    offset: number,
    search: string,
    sort: string,
}

export interface UpdateAdminByIdPayload{
    username: string,
    password: string,
    firstName: string,
    lastName: string,
    status: string, 
    picture: string,
    email: string
}