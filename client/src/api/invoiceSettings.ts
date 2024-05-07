import { InvoiceSettingsTypes } from "../types/invoiceSettingsTypes";
import { apiFetcher } from "./apiHelper";

// const API_URL = import.meta.env.VITE_API_URL as string;

/**
 *
 * @param token string
 * @returns all invoiceSettings example: tox, discount
 */

export const fetchInvoiceSettings = async (token?: string) => {
  return apiFetcher<InvoiceSettingsTypes[]>("settings", token || "");
};
