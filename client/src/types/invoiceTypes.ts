export interface InvoiceType {
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

export interface AllInvoicesPaginationType {
  id: number;
  invoiceId: string;
  customerName: string;
  totalPrice: string;
  currentDate: Date | string;
  statusName: string;
}

export type invoiceDetails = {
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
};
export interface SingleInvoiceByIdType {
  findInvoice?: Partial<invoiceJoinDataTypes[]>;
  findDetails?: Partial<invoiceDetails[]>;
}
