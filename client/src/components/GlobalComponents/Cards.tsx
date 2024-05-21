import "../../Styling/Components/GlobalComponentStyle/_cards.scss";

interface CardsProps {
  statusName: string;
}

const Cards: React.FC<CardsProps> = ({ statusName }) => {
  console.log(`${statusName}-card`);
  return (
    <div className={`${statusName}-card cards `}>
      <p className="cards__title">{statusName ?? ""}</p>
      <p className="cards__arrow">&uarr;</p>
      <p className="cards__value">€ 120.24</p>
      <p className="cards__subTitle">Lorem, ipsum dolor. lorem</p>
    </div>
  );
};

export default Cards;
