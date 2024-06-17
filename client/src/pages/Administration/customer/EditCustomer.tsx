import EditInput from "../../../components/GlobalComponents/EditInput";
import { customerInputs } from "./EditInputs";

interface EditCustomerProps {}

const EditCustomer: React.FC<EditCustomerProps> = ({}) => {
  const inputValues = customerInputs();
  return (
    <div className="popupScroll">
      <EditInput
        buttonName="Update"
        title="Customers Edit"
        defaultInputValues={inputValues}
      />
    </div>
  );
};

export default EditCustomer;
