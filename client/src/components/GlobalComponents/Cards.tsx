import "../../Styling/Components/GlobalComponentStyle/_cards.scss";
import CardSkeletonLoading from "./CardSkeletonLoading";
import ErrorMinimalDisplay from "./ErrorMinimalDisplay";

interface CardsProps {
  errorMessage?: Error;
  loading?: boolean;
  statusName?: string;
  statusPrice?: number;
  statusId?: number;
  totalInvoices?: number;
}

const Cards: React.FC<CardsProps> = ({
  statusName,
  statusPrice,
  statusId,
  errorMessage,
  loading,
  totalInvoices,
}) => {
  const statusDescriptions: { [key: number]: string } = {
    1: "Invoices being prepared.",
    2: "Invoices sent to clients.",
    3: "Invoices fully paid.",
    4: "Invoices past due date.",
    5: "Invoices canceled.",
  };

  const numberFormat = (number: number) => {
    return new Intl.NumberFormat("de-DE").format(number);

    // return 14.000,33 or 1.223.323,55
  };

  const description =
    statusId !== undefined
      ? statusDescriptions[statusId]
      : "No description available.";

  if (loading) return <CardSkeletonLoading />;

  if (errorMessage)
    return (
      <ErrorMinimalDisplay
        errorMessage={errorMessage?.message ?? "Error Reading Data"}
      />
    );

  return (
    <div className={`card-${statusId} cards `}>
      <p className="cards__title">{statusName ?? ""}</p>
      <p className="cards__totalInovices">{totalInvoices ?? 0}</p>
      <p className="cards__value">€ {numberFormat(statusPrice ?? 0)}</p>
      <p className="cards__subTitle">{description}</p>
    </div>
  );
};

export default Cards;
