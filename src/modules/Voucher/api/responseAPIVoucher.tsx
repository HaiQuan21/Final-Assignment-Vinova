import { type Voucher,type VoucherDoula } from "../../../constants/MainObjectClass"

export interface CreateVoucherResponse{
    message: string,
    data: Voucher
  }
  
  export interface GetVoucherResponse{
    message: string,
    data: [
      Voucher
    ]
    metadata: {
      page: number,
      limit: number,
      totalPages: number,
      totalCount: number,
      hasNextPage: boolean
    }
  }
  
  export interface GetVoucherByIdResponse{
    message: string,
    data: Voucher
  }

  export interface ListDoulaVoucher{
    message: string,
    data: [
        VoucherDoula
      ]
    metadata: {
      page: number,
      limit: number,
      totalPages: number,
      totalCount: number,
      hasNextPage: boolean
    }
  }