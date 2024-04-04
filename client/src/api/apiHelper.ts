import { LoginApiTypes } from "../types/loginType";

const API_URL = import.meta.env.VITE_API_URL as string;

export const fetchTokenValidation = async (
  token: string
): Promise<LoginApiTypes | null> => {
  try {
    const res = await fetch(`${API_URL}/login`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (data.success === true) {
      return data as LoginApiTypes;
    } else {
      return null;
    }
  } catch (err) {
    console.error(`Token validation failed:`, err);
    throw new Error("Token validation failed");
  }
};

/**
 *
 * @param url
 * @param token
 * @returns  api data
 */
export const apiFetcher = async <T>(url: string, token: string): Promise<T> => {
  try {
    const res = await fetch(`${API_URL}/${url}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error(`API request to ${url} failed with status ${res.status}`);
    }
    const data = await res.json();

    return data as T;
  } catch (err) {
    console.error(`Error fetching data from ${url}:`, err);
    throw new Error(`An error occurred while fetching the data from ${url}`);
  }
};
