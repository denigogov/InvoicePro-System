import { DefaultInputValuesTypes } from "../../../types/InputTypes";

export function customerInputs(companyData: any[]): DefaultInputValuesTypes[] {
  const formInputs: DefaultInputValuesTypes[] = [
    {
      id: 1,
      label: "Customer Name",
      name: "customerName",
      type: "text",
      minLength: 3,
      maxLength: 20,
      minLengthMessage: "Customer Name should be min 3 letters",
      maxLengthMessage: "Customer Name should be max 20 letters",
      defaultValue: companyData?.[0].bankName ?? "No Customer Name Found",
    },
    {
      id: 2,
      label: "ID Number",
      name: "idNumber",
      type: "text",
      minLength: 15,
      maxLength: 40,
      minLengthMessage: "idNumber should be min 15 letters",
      maxLengthMessage: "idNumber should be max 40 letters",
      defaultValue: companyData?.[0].iban ?? "No ID Number found",
    },
    {
      id: 3,
      label: "Street",
      name: "street",
      type: "text",
      minLength: 8,
      maxLength: 11,
      minLengthMessage: "street should be min 8 letters",
      maxLengthMessage: "street should be max 11 letters",
      defaultValue: companyData?.[0].street ?? "No street found",
    },
    {
      id: 4,
      label: "Zipcode",
      name: "street",
      type: "number",
      minLength: 8,
      maxLength: 11,
      minLengthMessage: "zipcode should be min 8 letters",
      maxLengthMessage: "zipcode should be max 11 letters",
      defaultValue: companyData?.[0].street ?? "No zipcode found",
    },
    {
      id: 5,
      label: "Country",
      name: "country",
      type: "text",
      minLength: 8,
      maxLength: 11,
      minLengthMessage: "country should be min 8 letters",
      maxLengthMessage: "country should be max 11 letters",
      defaultValue: companyData?.[0].street ?? "No country found",
    },
  ];

  return formInputs;
}
