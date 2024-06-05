import "../../Styling/Components/GlobalComponentStyle/_cardSkeletonLoading.scss";

const CardSkeletonLoading: React.FC = () => {
  return (
    <>
      <div className="cardSkeletonLoading">
        <p className="cardSkeletonLoading__title"></p>
        <p className="cardSkeletonLoading__totalInovices"></p>
        <p className="cardSkeletonLoading__value"> </p>
        <p className="cardSkeletonLoading__subTitle"></p>
      </div>

      <div className="cardSkeletonLoading">
        <p className="cardSkeletonLoading__title"></p>
        <p className="cardSkeletonLoading__totalInovices"></p>
        <p className="cardSkeletonLoading__value"> </p>
        <p className="cardSkeletonLoading__subTitle"></p>
      </div>
    </>
  );
};

export default CardSkeletonLoading;
