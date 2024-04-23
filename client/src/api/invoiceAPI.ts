import {
  InvoiceDetailsType,
  InvoiceType,
  LastInvoiceIdType,
} from "../types/invoiceTypes";
import { apiFetcher } from "./apiHelper";

const API_URL = import.meta.env.VITE_API_URL as string;

/**
 *
 * @param token string
 * @returns all invoices without details and price
 */
export const fetchLastInvoiceId = async (token?: string) => {
  return apiFetcher<LastInvoiceIdType[]>("invoice/lastId", token || "");
};

/**
 * API POST REQUEST for create customer comapny
 * @param token
 * @param queryData
 * @returns status 200 or 400
 */
export const createInvoice = async (
  token: string,
  queryData: Partial<InvoiceType>
) => {
  try {
    const res = await fetch(`${API_URL}/invoice`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(queryData),
    });

    if (!res.ok) {
      const errorResponse = await res.json();

      console.log("erroprrrrr", errorResponse);

      throw new Error(`${errorResponse.validationErrors[0].message}`);
    } else {
      return res;
    }
  } catch (err: unknown) {
    console.log(err);
    throw err;
  }
};

// Invoice Details

/**
 * API POST REQUEST for create invoice details
 * @param token
 * @param queryData(array for multiple invoiceID, descriptions and prices)
 * @returns status 201 or 400
 */
export const createInvoiceDetails = async (
  token: string,
  queryData: Partial<InvoiceDetailsType[]>
) => {
  try {
    const res = await fetch(`${API_URL}/invoice/details`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(queryData),
    });

    if (!res.ok) {
      const errorResponse = await res.json();

      console.log("erroprrrrr", errorResponse);

      throw new Error(`${errorResponse.validationErrors[0].message}`);
    } else {
      return res;
    }
  } catch (err: unknown) {
    console.log(err);
    throw err;
  }
};
