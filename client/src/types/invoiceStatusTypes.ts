export interface FetchAllInvoiceStatusTypes {
  id: number;
  statusName: string;
}

export interface findTaxPriceDiscountStatus {
  totalPrice: string;
  statusId: number;
  tax: string;
  discount: string;
}

export interface SelectStatusAndPrice {
  selectAllStatus?: Partial<FetchAllInvoiceStatusTypes[]>;
  findPriceTaxDiscount?: Partial<findTaxPriceDiscountStatus[]>;
}
