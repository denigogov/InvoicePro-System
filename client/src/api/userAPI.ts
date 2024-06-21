import { deleteActionPrompt } from "../components/GlobalComponents/deletePrompt";
import { successRequest } from "../components/GlobalComponents/successPrompt";
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

export const createUserAPI = async (
  token: string,
  queryData: Partial<FetchAllUsersTypes>
) => {
  try {
    const res = await fetch(`${API_URL}/user`, {
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
      return successRequest("Great", "Account Created Successfully!");
    }
  } catch (err: unknown) {
    if ((err as Error).message.includes("Duplicate")) {
      throw new Error(`User already exists`);
    }
    throw err;
  }
};

/**
 *
 * @param token string
 * @param id number - userID number
 */
export const deleteUser = async (token: string, id: number) => {
  try {
    const res = await fetch(`${API_URL}/user/${id}`, {
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

// REQUEST FOR RESET PASSWORD
/**
 *
 * @param queryData email as string
 */
export const requestNewPassword = async (queryData: { email: string }) => {
  try {
    const res = await fetch(`${API_URL}/user/pass-reset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(queryData),
    });

    if (!res.ok) {
      const errorResponse = await res.json();
      console.log("erroprrrrr", errorResponse);
      throw new Error(`${errorResponse.validationErrors[0].message}`);
    }
  } catch (err: unknown) {
    if ((err as Error).message.includes("Duplicate")) {
      throw new Error(`User already exists`);
    }
    throw err;
  }
};
