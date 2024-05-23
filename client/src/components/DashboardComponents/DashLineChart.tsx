import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  Filler,
  ChartData,
  ChartOptions,
  ScriptableContext,
} from "chart.js";

import { Line } from "react-chartjs-2";
import { InvoiceTotalMonthly } from "../../types/chartDataTypes";
import LoadingRing from "../GlobalComponents/LoadingRing";
import ErrorMinimalDisplay from "../GlobalComponents/ErrorMinimalDisplay";

interface LineChartProps {
  invoiceTotalMonthly?: InvoiceTotalMonthly[];
  invoiceTotalMonthlyError: Error;
  invoiceTotalMonthlyLoading: boolean;
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  Filler
);

const DashLineChart: React.FC<LineChartProps> = ({
  invoiceTotalMonthly,
  invoiceTotalMonthlyError,
  invoiceTotalMonthlyLoading,
}) => {
  const screenSize: number = window.innerWidth;

  const chartData = invoiceTotalMonthly?.map((data) => data.TotalSales ?? 0);
  const labels = invoiceTotalMonthly?.map((arr) => arr.InvoiceMonth);

  // const labels = [
  //   "Jan",
  //   "Feb",
  //   "Mar",
  //   "Apr",
  //   "May",
  //   "Jun",
  //   "Jul",
  //   "Aug",
  //   "Sep",
  //   "Oct",
  //   "Nov",
  //   "Dec",
  // ];

  const salesData: ChartData<"line"> = {
    labels,
    datasets: [
      {
        label: "Total Sales",
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        data: chartData,
        backgroundColor: "#003366",
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    indexAxis: `${screenSize <= 640 ? "y" : "x"}`,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    responsive: true,

    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context?.dataset.label || "";
            label ? (label += ` Total: ${context?.parsed?.y}`) : "";
            return label;
          },
        },
      },
    },
    borderColor: "#003366",
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    tension: 0.2,
    borderWidth: 2,

    fill: {
      target: `${screenSize <= 640 ? "" : "origin"}`,
      above: (context: ScriptableContext<"line">) => {
        const ctx = context.chart.ctx;
        const gradient = ctx.createLinearGradient(
          1,
          0,
          0,
          context.chart.height
        );
        gradient.addColorStop(0, "rgba(210, 219, 251, 0.063)");
        gradient.addColorStop(1, "#fff");
        return gradient;
      },
    },
  };

  const chartHight = screenSize <= 640 ? "600" : "";

  if (invoiceTotalMonthlyLoading) return <LoadingRing />;
  if (invoiceTotalMonthlyError)
    return (
      <ErrorMinimalDisplay
        errorMessage={
          invoiceTotalMonthlyError?.message ?? "something went wrong"
        }
      />
    );

  return (
    <div className="lineChart-dashboard">
      <Line options={options} data={salesData} height={chartHight} />
    </div>
  );
};

export default DashLineChart;
