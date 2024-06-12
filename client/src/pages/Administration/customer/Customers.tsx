import useSWR from "swr";
import { fetchCustomerData } from "../../../api/customerAPI";
import { useAuth } from "../../../helpers/useAuth";
import { AllCustomerTypes } from "../../../types/customerAPITypes";

interface CustomersProps {}

const Customers: React.FC<CustomersProps> = () => {
  const { token } = useAuth();

  const {
    data: allCustomersData,
    error: allCustomersDataError,
    isLoading: allCustomersDataLoading,
  } = useSWR<AllCustomerTypes[]>(["allCustomers", token], () =>
    fetchCustomerData(token ?? "")
  );

  console.log(allCustomersData);

  if (allCustomersDataError) return <p>allCustomersDataError.message</p>;
  if (allCustomersDataLoading) return <p>allCustomersDataLoading</p>;

  return <div>Customers Component</div>;
};

export default Customers;
