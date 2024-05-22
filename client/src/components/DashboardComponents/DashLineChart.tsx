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

// interface LineChartProps {}

const DashLineChart: React.FC = () => {
  const screenSize: number = window.innerWidth;

  const labels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const salesData: ChartData<"line"> = {
    labels,
    datasets: [
      {
        label: "Sales",
        data: [
          12000, 19000, 3000, 5000, 2000, 30000, 45000, 20000, 15000, 25000,
          30000, 40000,
        ],
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

  return (
    <div className="lineChart-dashboard">
      <Line options={options} data={salesData} height={chartHight} />
    </div>
  );
};

export default DashLineChart;
