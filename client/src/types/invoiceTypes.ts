export interface InvoiceType {
  invoiceId: string;
  date: Date | string;
  companyInfoId: number | null;
  customercompanyId: number | null;
  createdById: number | null;
  totalPrice: number | null;
}

export interface LastInvoiceIdType {
  lastId: number;
}

export interface InvoiceDetailsType {
  invoiceID: number | null | undefined;
  description: string;
  price: number | null;
}
