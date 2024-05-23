import "../../Styling/Components/GlobalComponentStyle/_cards.scss";
import CardSkeletonLoading from "./CardSkeletonLoading";
import ErrorMinimalDisplay from "./ErrorMinimalDisplay";

interface CardsProps {
  errorMessage?: Error;
  loading?: boolean;
  statusName?: string;
  statusPrice?: string;
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
    <div className={`card${statusId} cards `}>
      <p className="cards__title">{statusName ?? ""}</p>
      <p className="cards__totalInovices">{totalInvoices ?? 0}</p>
      <p className="cards__value">€ {statusPrice ?? ""}</p>
      <p className="cards__subTitle">{description}</p>
    </div>
  );
};

export default Cards;
