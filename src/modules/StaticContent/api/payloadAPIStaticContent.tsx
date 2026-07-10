export interface CreateStaticContentPayload{
    category: string,
    title: string,
    content: string,
    isRequired: boolean,
    hasContent: boolean,
    status: string
}

export interface UpdateStatiContentPayload{
    category: string,
    title: string,
    content: string,
    isRequired: boolean,
    hasContent: boolean,
    slug: string
}