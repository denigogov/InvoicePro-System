import { InvoiceTotalMonthly } from "../types/chartDataTypes";
import { apiFetcher } from "./apiHelper";

/**
 *
 * @param token string
 * @returns Invoice Total Money per Month 
 * {

    InvoiceMonth: "Jan",
    TotalSales: "387.20"

  },
 */
export const fetchInvoiceTotalMonthly = async (token?: string) => {
  try {
    return apiFetcher<InvoiceTotalMonthly[]>(
      "invoice/totalMonthly",
      token || ""
    );
  } catch (error) {
    console.log("vavava", error);
    throw error;
  }
};
