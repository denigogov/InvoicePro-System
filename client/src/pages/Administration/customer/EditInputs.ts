import { DefaultInputValuesTypes } from "../../../types/InputTypes";
import { AllCustomerTypes } from "../../../types/customerAPITypes";

export function customerInputs(
  companyData: AllCustomerTypes[]
): DefaultInputValuesTypes[] {
  const formInputs: DefaultInputValuesTypes[] = [
    {
      id: 1,
      label: "Customer Name",
      name: "customerName",
      type: "text",
      minLength: 3,
      maxLength: 50,
      minLengthMessage: "Customer Name should be min 3 letters",
      maxLengthMessage: "Customer Name should be max 50 letters",
      defaultValue: companyData?.[0].customerName ?? "No Customer Name Found",
    },
    {
      id: 2,
      label: "ID Number",
      name: "idNumber",
      type: "text",
      minLength: 3,
      maxLength: 50,
      minLengthMessage: "idNumber should be min 3 letters",
      maxLengthMessage: "idNumber should be max 50 letters",
      defaultValue: companyData?.[0].idNumber ?? "No ID Number found",
    },
    {
      id: 3,
      label: "Street",
      name: "street",
      type: "text",
      minLength: 3,
      maxLength: 100,
      minLengthMessage: "street should be min 3 letters",
      maxLengthMessage: "street should be max 100 letters",
      defaultValue: companyData?.[0].street ?? "No street found",
    },
    {
      id: 4,
      label: "Zipcode",
      name: "zipcode",
      type: "string",
      maxLength: 10,
      maxLengthMessage: "zipcode should be max 10 letters",
      defaultValue: companyData?.[0].zipcode ?? "No zipcode found",
    },

    {
      id: 5,
      label: "City",
      name: "city",
      type: "text",
      minLength: 3,
      maxLength: 30,
      minLengthMessage: "City should be min 3 letters",
      maxLengthMessage: "City should be max 30 letters",
      defaultValue: companyData?.[0].city ?? "No City found",
    },
    {
      id: 6,
      label: "Country",
      name: "country",
      type: "text",
      minLength: 3,
      maxLength: 30,
      minLengthMessage: "country should be min 3 letters",
      maxLengthMessage: "country should be max 30 letters",
      defaultValue: companyData?.[0].country ?? "No country found",
    },
  ];

  return formInputs;
}
