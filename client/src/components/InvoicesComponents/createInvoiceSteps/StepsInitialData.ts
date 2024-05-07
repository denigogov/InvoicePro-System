export interface Step2initialDateTypes {
  customerName: string;
  country: string;
  city: string;
  street: string;
  zipcode: string;
  idNumber: string;
}

export interface Step3initialDateTypes {
  invoiceId: string;
  data: Date | string;
  // description: string;
  // price: number | null;
  totalPrice: number | null;
  tax: number | null;
  discount: number | null;
}

export type Step4initialDateTypes = {
  id: number;
  description: string;
  price: number | null;
};

export const INITIAL_DATA_STEP2: Step2initialDateTypes = {
  customerName: "",
  country: "",
  city: "",
  street: "",
  zipcode: "",
  idNumber: "",
};

export const INITIAL_DATA_STEP3: Step3initialDateTypes = {
  invoiceId: "",
  data: "",
  totalPrice: null,
  tax: null,
  discount: null,
};

export const INITIAL_DATA_STEP4: Step4initialDateTypes[] = [
  { id: 1, description: "", price: null },
];
