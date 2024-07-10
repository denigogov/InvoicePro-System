import { QueryTypes, ReportDataTypes } from "../types/reportTypes";

const API_URL = import.meta.env.VITE_API_URL as string;

export const sendReportFilters = async (
  token: string,
  queryData: Partial<QueryTypes>
) => {
  try {
    const res = await fetch(`${API_URL}/invoice/report`, {
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
      return (await res.json()) as Partial<ReportDataTypes>;
    }
  } catch (err: unknown) {
    console.error("An error occurred while sending report filters:", err);
    throw err;
  }
};
