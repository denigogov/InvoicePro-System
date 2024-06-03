import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { FaCartPlus } from "react-icons/fa";

ChartJS.register(ArcElement, Tooltip, Legend);

// interface DashPieChartProps {}

const DashPieChart: React.FC = () => {
  const data = {
    labels: ["Paid Invoices", "Pending Invoices", "Overdue Invoices"],

    datasets: [
      {
        label: "Invoice Status",
        data: [30, 50, 20],
        backgroundColor: ["#E0E0E0", "#003366", "rgba(210, 219, 251, 0.2)"],
        hoverBackgroundColor: [
          "#CCCCCC ",
          "#002147",
          "rgba(190, 199, 245, 0.2)",
        ],
        spacing: 7,
        hoverOffset: 30,
        cutout: "70%",
        borderRadius: 20,
      },
    ],
  };

  return (
    <>
      <div className="analytics-card">
        <FaCartPlus size={30} />
        <div>
          <h4>Total Revenue</h4>
          <p>
            8,420 <span className="positive">↑ 35%</span>
          </p>
        </div>
      </div>
      <div className="analytics-card">
        <FaCartPlus size={30} />
        <div>
          <h4>Total Invoices</h4>
          <p>
            4,420 <span className="positive">↑ 15%</span>
          </p>
        </div>
      </div>
      <div className="pie-chart">
        <Doughnut data={data} />
      </div>
    </>
  );
};

export default DashPieChart;
