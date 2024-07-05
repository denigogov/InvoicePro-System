import moment from "moment";
import { useState } from "react";
import { CheckboxState, QueryTypes } from "../../types/reportTypes";
import { sendReportFilters } from "../../api/reportAPI";
import { apiGeneralErrorHandle } from "../GlobalComponents/ErrorShow";
import ReportForm from "./ReportForm";
import { useAuth } from "../../helpers/useAuth";

const ReportFilter: React.FC = () => {
  const today = moment().format("YYYY-MM-DD");
  const startOfMonth = moment().startOf("month").format("YYYY-MM-DD");

  const [startDate, setStartDate] = useState<string>(startOfMonth);
  const [endDate, setEndDate] = useState<string>(today);
  const [selectQuarter, setSelectQuarter] = useState<string>("");
  const [submit, setSubmit] = useState<boolean>(false);
  const [downloadReady, setDownloadReady] = useState<boolean>(false);

  const [allChecked, setAllChecked] = useState(true);
  const [checkboxes, setCheckboxes] = useState<CheckboxState>({
    totalInvoices: true,
    averageInvoice: true,
    totalDiscount: true,
    totalTax: true,
    totalCustomers: true,
    invoicesByStatus: true,
  });

  const { token } = useAuth();

  const handleToggleAll = () => {
    const newCheckedState = !allChecked;
    setAllChecked(newCheckedState);
    setCheckboxes({
      totalInvoices: newCheckedState,
      averageInvoice: newCheckedState,
      totalDiscount: newCheckedState,
      totalTax: newCheckedState,
      totalCustomers: newCheckedState,
      invoicesByStatus: newCheckedState,
    });
  };

  const handleCheckboxChange = (name: keyof CheckboxState) => {
    setCheckboxes((prevState) => {
      const newState = { ...prevState, [name]: !prevState[name] };
      const allSelected = Object.values(newState).every(Boolean);
      setAllChecked(allSelected);
      return newState;
    });
  };

  const submitFilterForm = async (query: Partial<QueryTypes>) => {
    try {
      const reportData = await sendReportFilters(token ?? "", query);

      if (reportData) {
        setSubmit(true);
        setDownloadReady(true);
      } else {
        setSubmit(false);
        setDownloadReady(false);
      }
    } catch (err) {
      apiGeneralErrorHandle(err);
    } finally {
      setSubmit(false);
    }
  };

  const submitDownloadReport = () => {
    console.log("you click on download");
  };

  const dateProps = { today, startDate, endDate, setStartDate, setEndDate };
  const quarterProps = { selectQuarter, setSelectQuarter };
  const checkProps = {
    checkboxes,
    allChecked,
    handleToggleAll,
    handleCheckboxChange,
  };
  const submitProps = {
    submit,
    submitFilterForm,
    downloadReady,
    submitDownloadReport,
  };

  return (
    <>
      <ReportForm
        dateProps={dateProps}
        quarterProps={quarterProps}
        checkProps={checkProps}
        submitProps={submitProps}
      />
    </>
  );
};

export default ReportFilter;
