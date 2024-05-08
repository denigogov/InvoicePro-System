import React from "react";
import { invoiceDetails } from "../../../types/invoiceTypes";
import { TaxDiscountValuesProps } from "../../../pages/Invoices/createInvoice/CreateInvoice";

interface InvoiceDetailsDescriptionProps {
  invoiceDescription: (invoiceDetails | undefined)[] | undefined;
  taxDiscountValues: TaxDiscountValuesProps;
}

const InvoiceDetailsDescription: React.FC<InvoiceDetailsDescriptionProps> = ({
  invoiceDescription,
  taxDiscountValues,
}) => {
  return (
    <div>
      <div className="invoiceDetails__description-wrap">
        <h3 className="invoiceDetails__description-wrap-title">Description</h3>
        {invoiceDescription?.map((details, i) => (
          <ul key={i}>
            <li>
              details: <span>{details?.description ?? "not found"}</span>
              <ul>
                <li>
                  price: <span>€ {details?.price ?? "not found"}</span>
                </li>
              </ul>
            </li>
          </ul>
        ))}
        <div className="invoiceDetails__description-wrap-price">
          {taxDiscountValues?.totalTax === "0.00" || (
            <h5>
              Tax: {taxDiscountValues?.taxValue} % - €{" "}
              {taxDiscountValues?.totalTax}
            </h5>
          )}

          {taxDiscountValues?.totalDiscount === "0.00" || (
            <h5>
              Discount: {taxDiscountValues.discountValue} % - €{" "}
              {taxDiscountValues?.totalDiscount}
            </h5>
          )}
          <h3>
            Total Price: €{" "}
            {taxDiscountValues?.totalPrice?.toFixed(2) ?? "not avaiable"}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetailsDescription;
