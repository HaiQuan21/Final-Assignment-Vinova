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

export interface ArticlePD {
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

export interface VoucherDoula{
  id: string,
  doulaId: string,
  voucherId: string,
  status: string,
  createdAt: string,
  updatedAt: string,
  doulaUser: {
    fullName: string,
    id: string,
    firstName: string,
    middleName: string | null,
    lastName: string,
    picture: string | null
  }
}

export interface Category {
  id: string;
  name: string;
  title: string;
  picture:{
    createAt: string,
    id: string,
    metadata: {
      thumbnail: { uri: string; key: string };
      medium: { uri: string; key: string };
    };
    type: string,
    uri: string
  }
  status: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

export interface AdminItem {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  role: string;
  status: string;
  email: string;
  picture: string;
  createdAt: string;
  updatedAt: string;
}