export interface GetCategoriesParams{
    page?: number;
    limit?: number;
    offset?: number;
    search?: string;
    sort?: string;
    f_name?: string;
  }

export interface CreateCategoriesPayload{
    title: string,
    name: string,
    image: string,
    status: string
}

export interface UpdateCategoriesPayload{
    title: string,
    name: string,
    image: string,
    status: string
}