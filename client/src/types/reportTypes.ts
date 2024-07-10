export interface CheckboxState {
  totalInvoices: boolean;
  averageInvoice: boolean;
  totalDiscount: boolean;
  totalTax: boolean;
  totalCustomers: boolean;
  invoicesByStatus: boolean;
}

export type QueryTypes = {
  checkedBox: CheckboxState;
  startDate: string;
  endDate: string;
  yearQuarter: string;
};

type TotalInvoices = {
  average_invoicePrice: string;
  total_customers: number;
  total_invoice: number;
};

type TotalDiscount = {
  discount: string;
  total_discount_sum: string;
  total_invoices: number;
};
type TotalTax = {
  tax: string;
  total_invoices: number;
  total_tax_sum: string;
};

export interface ReportDataTypes {
  TotalDiscount?: Partial<TotalDiscount[]>;
  TotalInvoices?: Partial<TotalInvoices[]>;
  TotalTax?: Partial<TotalTax[]>;
}
