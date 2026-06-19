export interface Admin {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  role: string;
  status: string;
  email: string;
  picture: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  picture: string;
  content: string;
  status: string;
  type: string;
  author: string;
  categoryId: string;
  timeToRead: number | null;
  createdAt: string;
  updatedAt: string;
  category: string | null;
}

export interface Voucher {
  id: string;
  code: string;
  description: string;
  startDate: string;
  endDate: string;
  status: string;
  type: string;
  amount: string;
  quantityUse: number;
  minPayAmount: string;
  maxDiscountAmount: string;
  stripeCouponId: string | null;
  createdBy: string;
  updatedBy: string | null;
  createdAt: string;
  updatedAt: string;
  totalDoulas: string;
}

export interface Category{
    id: string,
    name: string,
    title: string,
    image: string,
    status: string,
    slug: string,
    createdAt: string,
    updatedAt: string
}