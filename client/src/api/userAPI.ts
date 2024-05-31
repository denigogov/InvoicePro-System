import { FetchAllUsersTypes } from "../types/userDataTypes";
import { apiFetcher } from "./apiHelper";

const API_URL = import.meta.env.VITE_API_URL as string;

/**
 *
 * @param token string
 * @returns all data also department as name and id   except password
 */
export const fetchAllUsers = async (token?: string) => {
  return apiFetcher<FetchAllUsersTypes[]>("user", token || "");
};

/**
 *
 * @param id number
 * @param token string
 * @param url url
 * @param queryData optional for every query
 * @returns status 200
 */
export const updateUser = async <T>(
  id: string | undefined,
  token: string,
  queryData: T
) => {
  try {
    const res = await fetch(`${API_URL}/user/${id}`, {
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
