import "../../../Styling/Components/SettingsComponent/_companyDetails.scss";
import { Link, To } from "react-router-dom";
import React from "react";
import { DetailItem } from "../../../pages/Settings/companyInfo/CompanyProfile";
import SettingsInfoSkeletonLoading from "../../GlobalComponents/SkeletonLoading/SettingsInfoSkeletonLoading";

interface CompanyDetailsProps {
  companyDataError?: Error;
  companyDataLoading?: boolean;
  companyDetails?: DetailItem[];
  setPopupOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title?: string;
  navigateTo: To;
}

const CompanyDetails: React.FC<CompanyDetailsProps> = ({
  companyDataError,
  companyDataLoading,
  companyDetails,
  title,
  navigateTo,
  setPopupOpen,
}) => {
  // Sending the Error to the global Route Error Element !
  if (companyDataError) throw Error;
  if (companyDataLoading) return <SettingsInfoSkeletonLoading />;

  return (
    <div className="companyDetails">
      <div className="card">
        <div className="card-header">
          <h2>{title}</h2>

          <Link to={navigateTo} unstable_viewTransition>
            <p onClick={() => setPopupOpen((x) => !x)}>Edit</p>
          </Link>
        </div>
        <div className="card-body">
          <dl>
            {companyDetails?.map((info, i) => (
              <React.Fragment key={i}>
                <dt>{info?.label}</dt>
                <dd>{info?.value}</dd>
              </React.Fragment>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetails;
