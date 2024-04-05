export interface CompanyInfoTypes {
  bankName: string;
  bic: string;
  city: string;
  companyName: string;
  country: string;
  iban: string;
  id: number;
  idNumber: string;
  street: string;
  zipcode: number;
}

export type CompanyInfoDetails = Omit<
  CompanyInfoTypes,
  "bankName" | "bic" | "iban"
>;

export type CompanyBankInfo = Pick<
  CompanyInfoTypes,
  "bankName" | "bic" | "iban" | "id"
>;
