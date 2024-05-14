import {
  FetchAllInvoiceStatusTypes,
  SelectStatusAndPrice,
} from "../types/invoiceStatusTypes";
import { apiFetcher } from "./apiHelper";

/**
 *
 * @param token string
 * @returns fetch all Inovice Status
 */
export const fetchAllInvoiceStatus = async (token?: string) => {
  return apiFetcher<FetchAllInvoiceStatusTypes[]>("invoiceStatus", token || "");
};

/**
 *
 * @param token string
 * @param invoiceId string example 24-00023
 * @returns all status and data requere for update the invoice as Total Price, Status , Tax, Discount
 */
export const fetchStatusPriceTaxDiscount = async (
  token?: string,
  invoiceID?: string
) => {
  return apiFetcher<SelectStatusAndPrice>(
    `invoiceStatus/${invoiceID}`,
    token || ""
  );
};
