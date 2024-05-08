/**
 *Function for calculating the total TAX and Discount
 * @param price total sum price
 * @param tax tax in % example: 21% , 18%...
 * @returns  return only the calculated total tax
 */
export function taxDiscountCalculate(price: number, tax: number): string {
  return ((price * tax) / 100).toFixed(2);
}
