import InputFields from "../../../components/GlobalComponents/InputFields";
import "../../../Styling/Components/GlobalComponentStyle/_inputFileds.scss";
interface InvoiceModifyProps {}

const InvoiceModify: React.FC<InvoiceModifyProps> = ({}) => {
  const test = (e: any) => {
    e.preventDefault();
    console.log(e);
  };

  return (
    <InputFields title={"Invoice Details Modify"}>
      <label>Invoice Status</label>
      <select>
        <option>status</option>
        <option>status1</option>
        <option>status2</option>
        <option>status3</option>
      </select>
      <span></span>
      <label>Total Price</label>
      <input
        style={{ fontSize: ".9rem" }}
        type="text"
        minLength={15}
        maxLength={40}
      />
      <span></span>
      <label>Tax</label>
      <input type="text" minLength={8} maxLength={11} />
      <span></span>
      <label>Discount</label>
      <input type="text" minLength={8} maxLength={11} />
      <span></span>

      <button
        onClick={test}
        form="editCompanyForm"
        type="submit"
        className="action__button-global"
      >
        update
      </button>
    </InputFields>
  );
};

export default InvoiceModify;
