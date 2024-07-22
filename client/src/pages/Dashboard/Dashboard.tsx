import "../../Styling/Pages/Dashboard/_dashboard.scss";
import Cards from "../../components/GlobalComponents/Cards";
import DashTable from "../../components/DashboardComponents/DashTable";
import DashPieChart from "../../components/DashboardComponents/DashPieChart";
import DashLineChart from "../../components/DashboardComponents/DashLineChart";
import { useAuth } from "../../helpers/useAuth";
import { FetchtStatusCountChartTypes } from "../../types/invoiceStatusTypes";
import useSWR from "swr";
import { fetchtStatusCountChart } from "../../api/invoiceStatusAPI";
import CardSkeletonLoading from "../../components/GlobalComponents/CardSkeletonLoading";
import { fetchInvoiceTotalMonthly } from "../../api/chartAPI";
import { InvoiceTotalMonthly } from "../../types/chartDataTypes";
import { useNavigate } from "react-router-dom";
import { fetchRecentInvoices } from "../../api/invoiceAPI";
import { RecentInvoicesType } from "../../types/invoiceTypes";
import { useState } from "react";
import ReportFilter from "../../components/DashboardComponents/ReportFilter";

const Dashboard: React.FC = () => {
  const [openReport, setOpenReport] = useState<boolean>(false);
  const { token, userInfo } = useAuth();
  const navigator = useNavigate();

  const {
    data: invoiceStatusCount,
    error: invoiceStatusCountError,
    isLoading: invoiceStatusCountLoading,
  } = useSWR<FetchtStatusCountChartTypes[]>(["invoiceStatusCount", token], () =>
    fetchtStatusCountChart(token ?? "")
  );
  const {
    data: invoiceTotalMonthly,
    error: invoiceTotalMonthlyError,
    isLoading: invoiceTotalMonthlyLoading,
  } = useSWR<InvoiceTotalMonthly[]>(["invoiceTotalMonthly", token], () =>
    fetchInvoiceTotalMonthly(token ?? "")
  );
  const {
    data: recentInvoicesData,
    error: recentInvoicesDataError,
    isLoading: recentInvoicesDataLoading,
  } = useSWR<RecentInvoicesType[]>(["recentInvoices", token], () =>
    fetchRecentInvoices(token ?? "")
  );

  const openPopUp = () => {
    setOpenReport((e) => !e);
  };

  const handleDownloadReport = () => {
    setOpenReport((e) => !e);
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Welcome Back, {userInfo?.username ?? "User"}</h1>
        <p>Manage and track your invoices efficiently</p>
        <div className="header-buttons">
          <button onClick={handleDownloadReport} className="btn">
            Download Report
          </button>
          <button
            onClick={() => navigator("/invoices/create")}
            className="btn primary"
          >
            Add Invoice
          </button>
        </div>
      </header>

      {/* Cards */}
      <section className="dashboard-cards">
        {!invoiceStatusCountLoading ? (
          <>
            {invoiceStatusCount?.map((status) => (
              <Cards
                key={status.statusId}
                errorMessage={invoiceStatusCountError}
                loading={invoiceStatusCountLoading}
                statusName={status?.statusName ?? ""}
                statusPrice={status?.totalPrice}
                statusId={status?.statusId ?? 0}
                totalInvoices={status?.totalInvoices}
              />
            ))}
          </>
        ) : (
          <CardSkeletonLoading />
        )}
      </section>

      {/* Line Chart  */}
      <section className="dashboard-charts">
        <article className="chart">
          <h3>Sales Overview</h3>
          <DashLineChart
            invoiceTotalMonthly={invoiceTotalMonthly}
            invoiceTotalMonthlyError={invoiceTotalMonthlyError}
            invoiceTotalMonthlyLoading={invoiceTotalMonthlyLoading}
          />
        </article>

        {/* PIE Chart  */}
        <article className="chart">
          <h3>Analytics</h3>
          <div className="analytics">
            <DashPieChart />
          </div>
        </article>
      </section>

      {/* Table */}
      <div className="recent-activity ">
        <h3>Recent Invoices</h3>
        <DashTable
          recentInvoicesDataError={recentInvoicesDataError}
          recentInvoicesData={recentInvoicesData}
          recentInvoicesDataLoading={recentInvoicesDataLoading}
        />
      </div>

      {openReport && (
        <div className="overlay" onClick={openPopUp}>
          <main className="popUp msPopup" onClick={(e) => e.stopPropagation()}>
            <ReportFilter />
          </main>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
