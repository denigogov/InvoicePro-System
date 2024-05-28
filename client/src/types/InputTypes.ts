export interface DefaultInputValuesTypes {
  id?: number;
  name: string;
  type: string;
  required?: boolean | string;
  defaultValue?: string;
  minLength?: number | null;
  minLengthMessage?: string;
  maxLengthMessage?: string;
  maxLength?: number | null;
  pattern?: string;
  label?: string;
  step?: number;
  patternMessage?: string;
  options?: { value: number | string; label: string }[]; // New property for select options
}
