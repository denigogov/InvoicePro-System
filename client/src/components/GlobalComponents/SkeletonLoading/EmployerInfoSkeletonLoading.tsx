import "../../../Styling/Components/GlobalComponentStyle/SkeletonLoading/_employerInfoSkeletonLoading.scss";

const EmployerInfoSkeletonLoading: React.FC = () => {
  return (
    <div className="employerInfoSkeletonLoading width500">
      <ul>
        {Array.from({ length: 3 }, (_, i) => (
          <li key={i} className="skeletonEmployerInfo">
            <div className="left">
              <p></p>
              <p></p>
              <p></p>
            </div>
            <div className="right">
              <p></p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployerInfoSkeletonLoading;
