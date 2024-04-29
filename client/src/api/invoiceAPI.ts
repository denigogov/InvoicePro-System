import { deleteActionPrompt } from "../components/GlobalComponents/deletePrompt";
import {
  AllInvoicesPaginationType,
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

    console.log("post", res);

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

/**
 *
 * @param token string
 * @param pageNumber which page to read -- this is automated everytime when user scroll to bottom the page go to +1
 * @param limitResult limit the showing result per page
 * @returns [ 
 * {
 *id: number;
  invoiceId: string;
  customerName: string;
  totalPrice: string;
  currentDate: Date | string;
  statusName: string;
 * }
 *  ];
 */
export const fetchAllInvoicesPagination = async (
  token?: string,
  pageNumber?: number,
  limitResult?: number
) => {
  return apiFetcher<AllInvoicesPaginationType[]>(
    `invoice/?page=${pageNumber}&limit=${limitResult}`,
    token || ""
  );
};

export const deleteInvoice = async (token: string, id: number) => {
  try {
    const res = await fetch(`${API_URL}/invoice/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.ok) {
      // prompt after user click delete
      deleteActionPrompt();
    } else throw new Error(`${res.statusText}`);
  } catch (err: unknown) {
    console.log(err);
    throw err;
  }
};

/**
 * API PUT REQUEST for update companyInfo data
 * @param id invoiceID
 * @param token
 * @param queryData it can be only one or multiple values!
 * @returns status 200 or 401
 */

export const updateInvoice = async (
  id: number | null | undefined,
  token: string,
  queryData: Partial<AllInvoicesPaginationType>
) => {
  try {
    const res = await fetch(`${API_URL}/invoice/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(queryData),
    });

    if (!res.ok) {
      const errorResponse = await res.json();

      console.log(errorResponse);

      throw new Error(`${errorResponse.validationErrors[0].message}`);
    } else {
      return res;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};
