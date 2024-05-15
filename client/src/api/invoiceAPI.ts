import { deleteActionPrompt } from "../components/GlobalComponents/deletePrompt";
import {
  AllInvoicesPaginationType,
  InvoiceDetailsType,
  InvoiceType,
  LastInvoiceIdType,
  PaginationRequestType,
  SingleInvoiceByIdType,
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

const fetchingPagination = async <T>(
  url: string,
  token: string,
  query: Partial<PaginationRequestType>
): Promise<T> => {
  try {
    const res = await fetch(`${API_URL}/${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(query as PaginationRequestType),
    });

    if (res.status === 404) {
      throw new Response("Not Found", { status: 404 });
    }

    if (!res.ok) {
      throw Error(
        res.status === 401
          ? `API request failed, ${res.statusText}`
          : `API request failed with status ${res.status} - ${res.statusText}`
      );
    }
    const data = await res.json();

    return data as T;
  } catch (err) {
    console.log((err as Error)?.message);
    throw new Error((err as Error).message);
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
  limitResult?: number,
  query?: PaginationRequestType
) => {
  return fetchingPagination<AllInvoicesPaginationType[]>(
    `invoice/pagination/?page=${pageNumber}&limit=${limitResult}`,
    token || "",
    query ?? {}
  );
};

/**
 *
 * @param token string
 * @param invoiceId example: 24-00010 not 1 or 2 or 10....

 * @returns  
(  all joined table with the value mainly used for route Invoice/details when user click on button details inside of the table)

 */
export const fetchSingleInvoiceById = async (
  token?: string,
  invoiceId?: string
) => {
  return apiFetcher<SingleInvoiceByIdType>(`invoice/${invoiceId}`, token || "");
};

export const deleteInvoice = async (token: string, id: string) => {
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
 * @param ulr api update url
 * @param queryData it can be only one or multiple values!
 * @returns status 200 or 401
 */

export const updateInvoice = async <T>(
  id: number | null | undefined,
  token: string,
  url: string,
  queryData: T
) => {
  try {
    const res = await fetch(`${API_URL}/${url}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(queryData),
    });

    if (!res.ok) {
      const errorResponse = await res.json();

      throw new Error(`${errorResponse.validationErrors[0].message}`);
    } else {
      return res;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};
