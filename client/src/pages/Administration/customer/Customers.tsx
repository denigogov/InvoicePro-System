import useSWR from "swr";
import { fetchCustomerData } from "../../../api/customerAPI";
import { useAuth } from "../../../helpers/useAuth";
import { AllCustomerTypes } from "../../../types/customerAPITypes";
import CustomerTable from "../../../components/AdministrationComponents/customersComp/CustomerTable";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

interface CustomersProps {}

const Customers: React.FC<CustomersProps> = () => {
  const [popUpOpen, setPopupOpen] = useState<boolean>(false);
  const { token } = useAuth();
  const navigator = useNavigate();

  const popupWindow = () => {
    setPopupOpen((x) => !x);
    navigator("/administration/customers");
  };

  // when user click on the table edit button
  const openEditRoute = (invoiceId: number) => {
    setPopupOpen((x) => !x);
    navigator(`/administration/customers/edit/${invoiceId}`);
  };

  const {
    data: allCustomersData,
    error: allCustomersDataError,
    isLoading: allCustomersDataLoading,
  } = useSWR<AllCustomerTypes[]>(["allCustomers", token], () =>
    fetchCustomerData(token ?? "")
  );

  if (allCustomersDataError) return <p>allCustomersDataError.message</p>;
  if (allCustomersDataLoading) return <p>allCustomersDataLoading</p>;

  return (
    <div>
      <CustomerTable
        allCustomersData={allCustomersData}
        allCustomersDataError={allCustomersDataError}
        allCustomersDataLoading={allCustomersDataLoading}
        openEditRoute={openEditRoute}
      />

      {popUpOpen && (
        <div className="overlay" onClick={popupWindow}>
          <main className="popUp msPopup" onClick={(e) => e.stopPropagation()}>
            <Outlet context={[setPopupOpen]} />
          </main>
        </div>
      )}
    </div>
  );
};

export default Customers;
