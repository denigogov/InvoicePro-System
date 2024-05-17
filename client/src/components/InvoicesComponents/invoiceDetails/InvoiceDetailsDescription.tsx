import React, { useRef, useState } from "react";
import { invoiceDetails } from "../../../types/invoiceTypes";
import { TaxDiscountValuesProps } from "../../../pages/Invoices/createInvoice/CreateInvoice";
import editIcon from "../../../assets/editInvoiceDetailsIcon.svg";
import saveIcon from "../../../assets/saveIcon.svg";

interface InvoiceDetailsDescriptionProps {
  invoiceDescription: (invoiceDetails | undefined)[] | undefined;
  taxDiscountValues: TaxDiscountValuesProps;
  setUpdateDetails: React.Dispatch<React.SetStateAction<boolean>>;
  updateDetails: boolean;
  handleUpdateDescription: (
    query: invoiceDetails,
    editDescriptionId: number | null
  ) => void;
}

const InvoiceDetailsDescription: React.FC<InvoiceDetailsDescriptionProps> = ({
  invoiceDescription,
  taxDiscountValues,
  setUpdateDetails,
  updateDetails,
  handleUpdateDescription,
}) => {
  const [editDescriptionId, setEditDesciptionId] = useState<number | null>(
    null
  );

  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);

  const handleEditClick = (e: React.MouseEvent, id: number) => {
    e.preventDefault();
    setEditDesciptionId(id);
    setUpdateDetails(true);
  };

  const handleUpdateField = (e: React.FormEvent) => {
    e.preventDefault();
    setUpdateDetails((e) => !e);
    const query: Partial<invoiceDetails> = {};

    descriptionRef.current?.value !== invoiceDescription?.[0]?.description
      ? (query["description"] = descriptionRef.current?.value)
      : null;
    priceRef.current?.value !== invoiceDescription?.[0]?.price
      ? (query["price"] = priceRef.current?.value)
      : null;

    if (Object.keys(query).length) {
      handleUpdateDescription(query, editDescriptionId);
    }
  };

  // styling in invoiceDetails component !
  return (
    <div>
      <div className="invoiceDetails__description-wrap">
        <h3 className="invoiceDetails__description-wrap-title">Description</h3>
        {invoiceDescription?.map((details, i) => (
          <ul key={i}>
            {updateDetails && editDescriptionId === details?.id ? (
              <>
                <li>
                  <textarea
                    ref={descriptionRef}
                    defaultValue={details?.description}
                  ></textarea>
                  <ul>
                    <li>
                      <input
                        ref={priceRef}
                        type="text"
                        defaultValue={details?.price}
                      />
                    </li>
                  </ul>
                </li>
              </>
            ) : (
              <>
                <li>
                  details: <span>{details?.description ?? "not found"}</span>{" "}
                  <ul>
                    <li>
                      price: <span>€ {details?.price ?? "not found"} </span>
                    </li>
                  </ul>
                </li>
              </>
            )}
            {updateDetails && (
              <span className="toolTipSaveDetails">
                <img
                  className="editIcon "
                  src={saveIcon}
                  alt="editIcon"
                  onClick={handleUpdateField}
                />
              </span>
            )}

            {!updateDetails && (
              <span className="toolTipEditDetails">
                <img
                  className="updateIcon"
                  onClick={(e) => handleEditClick(e, details?.id ?? 0)}
                  src={editIcon}
                  alt="editIcon"
                />
              </span>
            )}
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
