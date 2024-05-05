import React from "react";
import { invoiceDetails } from "../../../types/invoiceTypes";

interface InvoiceDetailsDescriptionProps {
  invoiceDescription: (invoiceDetails | undefined)[] | undefined;
  totalPrice: string | undefined;
}

const InvoiceDetailsDescription: React.FC<InvoiceDetailsDescriptionProps> = ({
  invoiceDescription,
  totalPrice,
}) => {
  return (
    <div>
      <div className="invoiceDetails__description-wrap">
        <h3>Description</h3>
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
        <h3>
          Total Price: <span>€ {totalPrice ?? "not avaiable"}</span>
        </h3>
      </div>
    </div>
  );
};

export default InvoiceDetailsDescription;
