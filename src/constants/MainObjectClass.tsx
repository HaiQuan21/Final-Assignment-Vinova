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
  picture: {
    id: string;
    uri: string;
  } | null;
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
  amount: string;
  code: string;
  createdAt: string;
  createdBy: string;
  description: string;
  endDate: string;
  id: string;
  maxDiscountAmount: string;
  minPayAmount: string;
  numOfUsed: string;
  quantityUse: number;
  startDate: string;
  status: string;
  stripeCouponId: null;
  type: string;
  updatedAt: string;
  updatedBy: string;
}

export interface Category {
  id: string;
  name: string;
  title: string;
  image: string;
  status: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}
