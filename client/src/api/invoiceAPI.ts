import { InvoiceType } from "../types/invoiceTypes";
// import { apiFetcher } from "./apiHelper";

const API_URL = import.meta.env.VITE_API_URL as string;

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
