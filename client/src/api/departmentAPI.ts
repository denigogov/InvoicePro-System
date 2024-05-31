import { AllDepartmentsTypes } from "../types/departmentTypes";
import { apiFetcher } from "./apiHelper";

/**
 *
 * @param token string
 * @returns all departments by ID and Name
 */
export const fetchAllDepartments = async (token?: string) => {
  return apiFetcher<AllDepartmentsTypes[]>("department", token || "");
};
