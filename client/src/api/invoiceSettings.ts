import { InvoiceSettingsTypes } from "../types/invoiceSettingsTypes";
import { apiFetcher } from "./apiHelper";

const API_URL = import.meta.env.VITE_API_URL as string;

/**
 *
 * @param token string
 * @returns all invoiceSettings example: tox, discount
 */

export const fetchInvoiceSettings = async (token?: string) => {
  return apiFetcher<InvoiceSettingsTypes[]>("settings", token || "");
};

/**
 * API PUT REQUEST for update invoiceSettings data
 * @param id
 * @param token
 * @param queryData
 * @returns status 200 or 400
 */

export const updateInvoiceSettings = async (
  id: number | null,
  token: string,
  queryData: Partial<InvoiceSettingsTypes>
) => {
  try {
    const res = await fetch(`${API_URL}/settings/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(queryData),
    });

    if (!res.ok) {
      const errorResponse = await res.json();
      console.log("errorRes", errorResponse);
      throw new Error(errorResponse?.message || "something went wrong");
    } else {
      // return await res.text();
    }
  } catch (err) {
    console.log("err", err);
    throw err;
  }
};
