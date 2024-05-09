import { SelectStatusAndPrice } from "../types/invoiceStatusTypes";
import { apiFetcher } from "./apiHelper";

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
