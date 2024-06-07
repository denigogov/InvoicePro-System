import {
  FetchAllInvoiceStatusTypes,
  FetchtStatusCountChartTypes,
  SelectStatusAndPrice,
} from "../types/invoiceStatusTypes";
import { apiFetcher } from "./apiHelper";

const API_URL = import.meta.env.VITE_API_URL as string;

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

/**
 *
 * @param token string
 * @returns all invoices count by status 
 * {
    statusId: number,
    statusName: string,
    totalInvoices: number
  },
 */
export const fetchtStatusCountChart = async (token?: string) => {
  return apiFetcher<FetchtStatusCountChartTypes[]>(
    "invoiceStatus/chart",
    token || ""
  );
};

/**
 * @description API for updating the status name only 1 status at a time not multiple in one go!
 *
 * @param id number
 * @param token strng
 * @param queryData statusName as string
 *
 * return status 200
 *
 */

export const updateInvoiceStatus = async (
  id: number | null,
  token: string,
  queryData: Partial<FetchAllInvoiceStatusTypes>
) => {
  try {
    const res = await fetch(`${API_URL}/invoiceStatus/${id}`, {
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
      throw new Error(`${errorResponse.validationErrors[0].message}`);
    } else {
      // return await res.text();
    }
  } catch (err) {
    console.log("err", err);
    throw err;
  }
};
