export interface DefaultInputValuesTypes {
  id?: number;
  name: string;
  type: string;
  required?: boolean | string;
  requiredMessage?: string;
  defaultValue?: string;
  minLength?: number | null;
  minLengthMessage?: string;
  maxLengthMessage?: string;
  maxLength?: number | null;
  pattern?: RegExp | null;
  label?: string;
  step?: number;
  patternMessage?: string;
  defaultSelectValue?: { value: number | string; label: string };
  options?: { value: number | string; label: string }[]; // New property for select options
}
