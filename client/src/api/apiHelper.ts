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

    // if (res.status === 404) {
    //   throw new Response("Not Found", { status: 404 });
    // }

    // if (!res.ok) {
    //   throw Error(
    //     res.status === 401
    //       ? `API request failed, ${res.statusText}`
    //       : `API request failed with status ${res.status} - ${res.statusText}`
    //   );
    // }

    if (!res.ok) {
      // Attempt to parse the error response body
      const errorData = await res.json();
      const errorMessage =
        errorData.message ||
        `API request failed with status ${res.status} - ${res.statusText}`;

      console.log(errorData);
      throw new Error(errorMessage);
    }
    const data = await res.json();
    return data as T;
  } catch (err) {
    console.error(`API request failed for URL ${url}:`, err);
    throw new Error((err as Error).message || "An unknown error occurred");
  }
};
