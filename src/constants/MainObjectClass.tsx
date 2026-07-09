import { string } from "zod";

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

export interface Doula {
  id: string;
  title: string;
  status: string;
  user: {
    fullName: string;
    firstName: string;
    middleName: string | null;
    lastName: string;
    birthDate: string;
    email: string;
    countryCode: string,
    phoneNumber: string,
    lastAccess: string,
  };
  address: {
    id: string;
    fullAddress: string;
  } | null;
  picture: {
    id: string;
    uri: string;
    type: string;
    metadata: {
      thumbnail: { uri: string; key: string };
      medium: { uri: string; key: string };
    };
    createdAt: string;
  } | null,
  createdAt: string
}

export interface DoulaDetail {
  id: string;
  title: string;
  description: string;
  businessName: string | null;
  status: string;
  photos: [
    {
      id: string,
      media: {
        createdAt: string,
        id: string,
        metadata:{
          medium:{
            key: string,
            uri: string
          },
          thumbnail:{
            key: string,
            uri: string
          }
        }
        type: string,
        uri: string,
      }
    }
  ];
  qualifications: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  cometChatUid: string;
  user: {
    fullName: string;
    firstName: string;
    middleName: string | null;
    lastName: string;
    picture: string | null;
    birthDate: string;
    email: string,
    countryCode: string,
    phoneNumber: string,
    lastAccess: string,
  };
  categories:{
    id: string;
    image: string;
    name: string;
    title: string;
  };
  address: {
    id: string;
    fullAddress: string;
  } | null;
}

export interface Client {
  id: string;
  fullName: string;
  firstName: string;
  middleName: string | null;
  lastName: string;
  birthDate: string;
  email: string;
  phoneNumber: string | null;
  countryCode: string | null;
  googleId: string | null;
  appleId: string | null;
  status: string;
  verifiedEmail: boolean;
  verifiedPhoneNumber: boolean;
  updatedBy: string;
  deletedBy: string;
  deActiveAt: string | null;
  isExternal: boolean;
  createdAt: string;
  updatedAt: string;
  address: { fullAddress: string } | null;
  picture: {
    id: string;
    uri: string;
    type: string;
    metadata: {
      thum: { uri: string; key: string };
      medium: { uri: string; key: string };
    };
    createdAt: string;
  } | null;
}