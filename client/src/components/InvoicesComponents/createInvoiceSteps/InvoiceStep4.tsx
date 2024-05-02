import MultiFormWraper from "../../GlobalComponents/MultiFormWraper";

import addIcon from "../../../assets/addIcon.svg";
import trashIcon from "../../../assets/trash-svgrepo-com.svg";
import React from "react";
import { Step4initialDateTypes } from "./StepsInitialData";

interface InvoiceStep4Props {
  addDescriptionAndPrice: Step4initialDateTypes[];
  setAddDescriptionAndPrice: React.Dispatch<
    React.SetStateAction<Step4initialDateTypes[]>
  >;
  setCheckboxSignature: React.Dispatch<React.SetStateAction<boolean>>;
}

const InvoiceStep4: React.FC<InvoiceStep4Props> = ({
  addDescriptionAndPrice,
  setAddDescriptionAndPrice,
  setCheckboxSignature,
}) => {
  const handleAddFiled = () => {
    const newId = addDescriptionAndPrice.length
      ? addDescriptionAndPrice[addDescriptionAndPrice.length - 1].id + 1
      : 1;

    setAddDescriptionAndPrice([
      ...addDescriptionAndPrice,
      { description: "", price: null, id: newId },
    ]);
  };

  const handlePriceChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const updatedList = [...addDescriptionAndPrice];
    updatedList[index].price = parseFloat(e.target.value);
    setAddDescriptionAndPrice(updatedList);
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const updatedList = [...addDescriptionAndPrice];
    updatedList[index].description = e.target.value;
    setAddDescriptionAndPrice(updatedList);
  };

  const removeFiled = (i: number) => {
    const updatedList = addDescriptionAndPrice.filter(
      (_, index) => index !== i
    );
    setAddDescriptionAndPrice(updatedList);
  };

  return (
    // Styling in InvoiceStep1
    <div className="invoiceStep4">
      <MultiFormWraper
        title=" Invoice description"
        subTitle="Fill in the invoice details."
      >
        {/* div className="multiFormWraper__fieldGroup"  */}
        {addDescriptionAndPrice.map((item, i) => (
          <div className="multiFormWraper__fieldGroup" key={item?.id}>
            <label>Description</label>
            <input
              type="text"
              minLength={3}
              maxLength={200}
              required
              onChange={(e) => handleDescriptionChange(e, i)}
            />
            <label>Price</label>
            <input
              type="number"
              step={0.01}
              min={0}
              required
              onChange={(e) => handlePriceChange(e, i)}
            />{" "}
            <p className="invoiceStep4__removeFiled">
              {i + 1 > 1 && (
                <img
                  onClick={() => removeFiled(i)}
                  src={trashIcon}
                  alt="remove filed"
                />
              )}
            </p>
          </div>
        ))}
        <div className="invoiceStep4__checkbox">
          <label>Signature</label>
          <input
            type="checkbox"
            onChange={() => setCheckboxSignature((e) => !e)}
          />
        </div>
      </MultiFormWraper>
      <div className="invoiceStep4__addFiled">
        <p>
          <img onClick={handleAddFiled} src={addIcon} alt="addIcon" />
        </p>
      </div>{" "}
    </div>
  );
};

export default InvoiceStep4;
