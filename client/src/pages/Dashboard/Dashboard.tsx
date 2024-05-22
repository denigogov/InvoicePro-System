import "../../Styling/Pages/Dashboard/_dashboard.scss";
import Cards from "../../components/GlobalComponents/Cards";
import DashTable from "../../components/DashboardComponents/DashTable";
import DashPieChart from "../../components/DashboardComponents/DashPieChart";
import DashLineChart from "../../components/DashboardComponents/DashLineChart";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from "chart.js";
import { useAuth } from "../../helpers/useAuth";
import { FetchtStatusCountChartTypes } from "../../types/invoiceStatusTypes";
import useSWR from "swr";
import { fetchtStatusCountChart } from "../../api/invoiceStatusAPI";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard: React.FC = () => {
  const { token } = useAuth();

  const {
    data: invoiceStatusCount,
    error: invoiceStatusCountError,
    isLoading: invoiceStatusCountLoading,
  } = useSWR<FetchtStatusCountChartTypes[]>(["singleInvoiceById", token], () =>
    fetchtStatusCountChart(token ?? "")
  );

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Welcome Back, Dejan</h1>
        <p>Manage and track your invoices efficiently</p>
        <div className="header-buttons">
          <button className="btn">Download Report</button>
          <button className="btn primary">Add Invoice</button>
        </div>
      </header>

      {/* Cards */}
      <section className="dashboard-cards">
        {invoiceStatusCount?.map((status) => (
          <Cards
            errorMessage={invoiceStatusCountError}
            loading={invoiceStatusCountLoading}
            statusName={status?.statusName ?? ""}
            statusPrice={status.totalPrice}
            statusId={status?.statusId ?? 0}
            totalInvoices={status?.totalInvoices}
          />
        ))}
      </section>

      {/* Line Chart  */}
      <section className="dashboard-charts">
        <article className="chart">
          <h3>Sales Overview</h3>
          <DashLineChart />
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
        <DashTable />
      </div>
    </div>
  );
};

export default Dashboard;
