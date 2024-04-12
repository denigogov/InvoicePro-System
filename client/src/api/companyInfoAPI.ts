import { CompanyInfoTypes } from "../types/companyInfoTypes";
import { apiFetcher } from "./apiHelper";

const API_URL = import.meta.env.VITE_API_URL as string;
/**
 *
 * @param token string
 * @returns all company info data
 */
export const fetchCompanyInfo = async (token?: string) => {
  return apiFetcher<CompanyInfoTypes[]>("company-info", token || "");
};

/**
 * API PUT REQUEST for update companyInfo data
 * @param id
 * @param token
 * @param queryData
 * @returns status 200 or 401
 */

export const updateCompanyInfo = async (
  id: number,
  token: string,
  queryData: Partial<CompanyInfoTypes>
) => {
  try {
    const res = await fetch(`${API_URL}/company-info/${id}`, {
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
      return await res.json();
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};
