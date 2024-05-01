interface InvoiceDetailsDescriptionProps {}

const InvoiceDetailsDescription: React.FC<
  InvoiceDetailsDescriptionProps
> = ({}) => {
  return (
    <div>
      <div className="invoiceDetails__description-wrap">
        <h3>Description</h3>
        <ul>
          <li>
            details:{" "}
            <span>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugit,
              velit quas. Quas ipsam quam est nihil nam ad sed laborum.
            </span>
            <li>
              price: <span>€ 440</span>
            </li>
          </li>
        </ul>

        <h3>
          Total Price: <span>€ 300</span>
        </h3>
      </div>
    </div>
  );
};

export default InvoiceDetailsDescription;
