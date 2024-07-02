/**
 *Function for calculating the total TAX and Discount
 * @param price total sum price
 * @param tax tax in % example: 21% , 18%...
 * @returns  return only the calculated total tax
 */
export function taxDiscountCalculate(price: number, tax: number): string {
  return ((price * tax) / 100).toFixed(2);
}

/**
 *
 * @param nakedPrice the service price from description
 * @param totalTax tax in % example: 21% , 18%...
 * @param discountValue discount in % example: 21% , 18%...
 * @returns correct all calc values , totalTax,TotalDiscount and Total Price calc with tax and discount !
 */
export function calcTotalPrice(
  nakedPrice: number,
  discountValue: number,
  taxValue: number
) {
  const totalDiscount = +taxDiscountCalculate(nakedPrice, discountValue);
  const netPrice = nakedPrice - +totalDiscount;
  const totalTax = +taxDiscountCalculate(netPrice, taxValue);
  const totalPrice = netPrice + +totalTax;

  return {
    totalDiscount,
    netPrice,
    totalTax,
    totalPrice,
  };
}
