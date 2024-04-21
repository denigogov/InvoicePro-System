export interface InvoiceType {
  invoiceId: string;
  date: Date | string;
  companyInfoId: number | null;
  customercompanyId: number | null;
  createdById: number | null;
  description: string;
  price: number | null;
  totalPrice: number | null;
}
