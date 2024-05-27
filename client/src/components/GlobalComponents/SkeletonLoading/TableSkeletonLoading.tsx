import "../../../Styling/Components/GlobalComponentStyle/SkeletonLoading/_tableSkeleton.scss";

const TableSkeletonLoading: React.FC = () => {
  return (
    <div className="tableSkeleton width600">
      <div className="tableSkeleton__head"></div>
      <div className="tableSkeleton__row">
        <p></p>
        <p></p>
        <p></p>
        <p></p>
        <p></p>
      </div>
      <div className="tableSkeleton__row">
        <p></p>
        <p></p>
        <p></p>
        <p></p>
        <p></p>
      </div>
      <div className="tableSkeleton__row">
        <p></p>
        <p></p>
        <p></p>
        <p></p>
        <p></p>
      </div>

      <div className="tableSkeleton__footer">
        <p></p>
        <p></p>
        <p></p>
      </div>
    </div>
  );
};

export default TableSkeletonLoading;
