export interface GetAllStaticContentResponse{
    message: string,
    data: [
      {
        id: string,
        slug: string,
        category: string,
        title: string,
        content: string,
        status: string,
        isRequired: boolean,
        hasContent: boolean,
        createdAt: string,
        updatedAt: string,
        deletedAt: string | null
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

export interface GetStaticContentBySlugResponse{
    message: string,
    data: {
      id: string,
      slug: string,
      category: string,
      title: string,
      content: string,
      status: string,
      isRequired: true,
      hasContent: true,
      createdAt: string,
      updatedAt: string,
      deletedAt: string | null
    }
  }

