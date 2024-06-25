export interface FetchAllInvoiceStatusTypes {
  id: number;
  statusName: string;
}

export interface findTaxPriceDiscountStatus {
  id: number;
  totalPrice: string;
  statusId: number;
  tax: string;
  discount: string;
}

export interface SelectStatusAndPrice {
  selectAllStatus?: Partial<FetchAllInvoiceStatusTypes[]>;
  findPriceTaxDiscount?: Partial<findTaxPriceDiscountStatus[]>;
}

export interface FetchtStatusCountChartTypes {
  statusId: number;
  statusName: string;
  totalPrice: number;
  totalInvoices: number;
}
