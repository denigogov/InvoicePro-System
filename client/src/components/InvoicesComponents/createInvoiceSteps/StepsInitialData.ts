export interface Step2initialDateTypes {
  customerName: string;
  country: string;
  city: string;
  street: string;
  zipcode: number | null;
  idNumber: string;
}

export interface Step3initialDateTypes {
  invoiceId: string;
  data: Date | string;
  description: string;
  price: number | null;
  totalPrice: number | null;
}

export const INITIAL_DATA_STEP2: Step2initialDateTypes = {
  customerName: "",
  country: "",
  city: "",
  street: "",
  zipcode: null,
  idNumber: "",
};

export const INITIAL_DATA_STEP3: Step3initialDateTypes = {
  invoiceId: "",
  data: "",
  description: "",
  price: null,
  totalPrice: null,
};
