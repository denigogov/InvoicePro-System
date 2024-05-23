export interface InvoiceType {
  date: Date | string;
  companyInfoId: number | null;
  customercompanyId: number | null;
  createdById: number | null;
  tax?: number | null;
  discount?: number | null;
}

export interface LastInvoiceIdType {
  lastId: number;
}

export interface InvoiceDetailsType {
  invoiceID: number | null | undefined;
  description: string;
  price: number | null;
}
export interface PaginationSettingsType {
  limit: number;
  page: number;
  totalPages: number;
}
export interface InvoicePaginationDataType {
  id: number;
  invoiceId: string;
  customerName: string;
  tax: number | null;
  discount: number | null;
  date: Date | string;
  totalPrice: number;
  statusName: string;
}
export interface AllInvoicesPaginationType {
  invoiceData: InvoicePaginationDataType[];
  pagination: PaginationSettingsType;
}

export interface PaginationRequestType {
  minPrice?: string;
  maxPrice?: string;
  statusId?: string;
  createdDate?: string;
  field?: string;
  direction?: string;
}

export type invoiceDetails = {
  id?: number;
  description?: string;
  price?: string;
};

export type invoiceJoinDataTypes = {
  invoiceId: string;
  currentDate: string;
  totalPrice: string;
  statusName: string;
  customerName: string;
  country: string;
  city: string;
  street: string;
  zipcode: string;
  idNumber: string;
  tax: string;
  discount: string;
};
export interface SingleInvoiceByIdType {
  findInvoice?: Partial<invoiceJoinDataTypes[]>;
  findDetails?: Partial<invoiceDetails[]>;
}
