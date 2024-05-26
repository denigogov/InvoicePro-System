import { FetchAllUsersTypes } from "../types/userDataTypes";
import { apiFetcher } from "./apiHelper";

/**
 *
 * @param token string
 * @returns all data also department as name and id   except password
 */
export const fetchAllUsers = async (token?: string) => {
  return apiFetcher<FetchAllUsersTypes[]>("user", token || "");
};
