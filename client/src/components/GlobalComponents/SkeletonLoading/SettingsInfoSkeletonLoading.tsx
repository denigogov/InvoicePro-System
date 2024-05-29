import "../../../Styling/Components/GlobalComponentStyle/SkeletonLoading/_settingsInfoSkeletonLoading.scss";

const SettingsInfoSkeletonLoading: React.FC = () => {
  return (
    <div className="settingsSkeleton">
      <h1></h1>
      <div className="settingsSkeleton-rows">
        <p></p>
        <p></p>
        <p></p>
        <p></p>
        <p></p>
      </div>
    </div>
  );
};

export default SettingsInfoSkeletonLoading;
