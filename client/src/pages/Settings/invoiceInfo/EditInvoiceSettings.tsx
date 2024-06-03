import EditInput from "../../../components/GlobalComponents/EditInput";
import { DefaultInputValuesTypes } from "../../../types/InputTypes";

const EditInvoiceSettings: React.FC = () => {
  const editInvoiceInputFileds: DefaultInputValuesTypes[] = [
    {
      id: 1,
      label: "Tax Rate %",
      name: "tax",
      type: "number",
      placeholder: "Enter tax rate (e.g., 5%)",
      minLength: 1,
      maxLength: 4,
      minLengthMessage: "Tax rate should be at least 0.1%",
      maxLengthMessage: "Tax rate should not exceed more than 100%",
      step: 0.1,
      defaultValue: "21",
    },

    {
      id: 2,
      label: "Discount Rate %",
      name: "discount",
      type: "number",
      placeholder: "Discount rate (e.g., 10%)",
      minLength: 1,
      maxLength: 4,
      minLengthMessage: "Discount rate should be at least 0.1%",
      maxLengthMessage: "Discount rate should not exceed more than 100%",
      step: 0.1,
      defaultValue: "10",
    },
  ];

  return (
    <div className="editEmployer">
      <EditInput
        title="Invoice Settings Update"
        buttonName="Update"
        defaultInputValues={editInvoiceInputFileds}
      />
    </div>
  );
};

export default EditInvoiceSettings;
