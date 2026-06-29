// ─── Articles ─────────────────────────────────────────────────────────────────
export interface CreateArticlePDPayload {
    title: string;
    content: string;
    picture: string;
    status: string;
    type: string;
    timeToRead: number;
    categoryId: string;
    author: string;
  }
  
  export interface UpdateArticlePDPayload {
    title: string;
    content: string;
    picture: string;
    status: string;
    type: string;
    timeToRead: number;
    categoryId: string;
  }

  export interface GetArticlesPDParams{
    page?: number;
    limit?: number;
    offset?: number;
    search?: string;
    sort?: string;
    f_type?: "article" | "pd"
    f_categoryId?: string,
    f_status?: "published" | "unpublished" | "draft";
  }