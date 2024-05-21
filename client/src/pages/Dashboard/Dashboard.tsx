import React, { useRef, useEffect } from "react";
import { FaCartPlus } from "react-icons/fa";
import Chart from "chart.js/auto";
import "../../Styling/Pages/Dashboard/_dashboard.scss";
import Cards from "../../components/GlobalComponents/Cards";

const Dashboard: React.FC = () => {
  const lineChartRef = useRef(null);
  const doughnutChartRef = useRef(null);

  const salesData = {
    labels: [
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
    ],
    datasets: [
      {
        label: "Sales",
        data: [
          12000, 19000, 3000, 5000, 2000, 30000, 45000, 20000, 15000, 25000,
          30000, 40000,
        ],
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        backgroundColor: (context) => {
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
        borderColor: "#003366",
        fill: true,
      },
    ],
  };

  const pieData = {
    labels: ["Online Orders", "Offline Orders"],
    datasets: [
      {
        label: "Orders",
        data: [60, 40],
        backgroundColor: ["#003366", "rgba(210, 219, 251, 0.2)"],
        hoverBackgroundColor: ["#003399", "rgba(210, 219, 251, 0.5)"],
      },
    ],
  };

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const lineChartInstance = new Chart(lineChartRef.current, {
      type: "line",
      data: salesData,
    });
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const doughnutChartInstance = new Chart(doughnutChartRef.current, {
      type: "doughnut",
      data: pieData,
    });

    return () => {
      lineChartInstance.destroy();
      doughnutChartInstance.destroy();
    };
  }, []);

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Welcome Back, Royal</h1>
        <p>Track, manage and forecast your customers and orders</p>
        <div className="header-buttons">
          <button className="btn">Download Report</button>
          <button className="btn primary">Add Invoice</button>
        </div>
      </header>
      <div className="dashboard-cards">
        <Cards statusName="Paid" />
        <Cards statusName="Overdue" />
        <Cards statusName="Draft" />
        <Cards statusName="Send" />
        <Cards statusName="Void" />
      </div>
      <div className="dashboard-charts">
        <div className="chart">
          <h3>Sales Overview</h3>
          <canvas ref={lineChartRef}></canvas>
        </div>
        <div className="chart">
          <h3>Analytics</h3>
          <div className="analytics">
            <div className="analytics-card">
              <FaCartPlus size={30} />
              <div>
                <h4>Total Products</h4>
                <p>
                  8,420 <span className="positive">↑ 15%</span>
                </p>
              </div>
            </div>
            <div className="analytics-card">
              <FaCartPlus size={30} />
              <div>
                <h4>Total Orders</h4>
                <p>
                  4,420 <span className="positive">↑ 15%</span>
                </p>
              </div>
            </div>
            <div className="pie-chart">
              <canvas ref={doughnutChartRef}></canvas>
            </div>
          </div>
        </div>
      </div>
      <div className="recent-activity">
        <h3>Recent Orders</h3>
        <table>
          <thead>
            <tr>
              <th>Tracking ID</th>
              <th>Product Name</th>
              <th>Date</th>
              <th>Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td data-label="Invoice ID">12345</td>
              <td data-label="Comapny Name">Product 1</td>
              <td data-label="Date">2024-05-19</td>
              <td data-label="Price">$100</td>
              <td data-label="Status">Shipped</td>
            </tr>
            <tr>
              <td data-label="Invoice ID">12346</td>
              <td data-label="Comapny Name">Product 2</td>
              <td data-label="Date">2024-05-18</td>
              <td data-label="Price">$200</td>
              <td data-label="Status">Pending</td>
            </tr>
            <tr>
              <td data-label="Invoice ID">12347</td>
              <td data-label="Comapny Name">Product 3</td>
              <td data-label="Date">2024-05-17</td>
              <td data-label="Price">$150</td>
              <td data-label="Status">Delivered</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
