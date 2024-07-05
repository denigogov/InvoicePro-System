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
