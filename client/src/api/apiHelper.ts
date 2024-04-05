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
      const errorData = await res.json();

      if (res.status === 401) {
        throw new Error(`API request failed, ${errorData.error}`);
      } else {
        throw new Error(
          `API request to ${url} failed with status ${res.statusText}`
        );
      }
    }

    const data = await res.json();

    return data as T;
  } catch (err) {
    console.log((err as Error).message);

    throw new Error((err as Error).message);
  }
};
