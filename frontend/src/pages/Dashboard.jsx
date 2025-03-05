import React, { useState, useRef, useEffect } from "react";
import { Line, Bar } from "react-chartjs-2";
import { FaUsers, FaShoppingCart, FaPills, FaMoneyBillWave } from "react-icons/fa";
import { motion } from "framer-motion";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [graphType, setGraphType] = useState("line");
  const [selectedMetric, setSelectedMetric] = useState("sales");

  const generateRandomData = () =>
    Array.from({ length: 12 }, () => Math.floor(Math.random() * 200) + 30);

  const yearlyData = {
    sales: generateRandomData(),
    orders: generateRandomData(),
    medicines: generateRandomData(),
    customers: generateRandomData(),
  };

  const chartData = {
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
        label: selectedMetric.charAt(0).toUpperCase() + selectedMetric.slice(1),
        data: yearlyData[selectedMetric],
        borderColor: "#4F46E5",
        backgroundColor: "rgba(79, 70, 229, 0.2)",
      },
    ],
  };

  const stats = [
    {
      key: "sales",
      title: "Total Sales",
      value: "$250,000",
      icon: <FaMoneyBillWave size={30} />,
      color: "bg-green-500",
    },
    {
      key: "orders",
      title: "Total Orders",
      value: "11,300",
      icon: <FaShoppingCart size={30} />,
      color: "bg-blue-500",
    },
    {
      key: "medicines",
      title: "Total Medicines",
      value: "1,520",
      icon: <FaPills size={30} />,
      color: "bg-purple-500",
    },
    {
      key: "customers",
      title: "Customers",
      value: "8,130",
      icon: <FaUsers size={30} />,
      color: "bg-orange-500",
    },
  ];

  const barChartInstanceRef = useRef(null);
  const barChartCanvasRef = useRef(null);

  useEffect(() => {
    if (graphType === "bar") {
      if (barChartInstanceRef.current) {
        barChartInstanceRef.current.destroy();
      }

      if (barChartCanvasRef.current) {
        barChartInstanceRef.current = new ChartJS(barChartCanvasRef.current, {
          type: "bar",
          data: chartData,
          options: { responsive: true },
        });
      }
    }

    return () => {
      if (barChartInstanceRef.current) {
        barChartInstanceRef.current.destroy();
      }
    };
  }, [chartData, graphType]);

  return (
    <div className="p-6">
     
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-281 ">
        {stats.map((stat) => (
          <motion.div
            key={stat.key}
            className="p-4 flex items-center space-x-4 bg-gray-200 shadow-md rounded-lg cursor-pointer hover:shadow-lg transition"
            onClick={() => setSelectedMetric(stat.key)}
            whileHover={{ scale: 1.05 }}
          >
            <div className={`p-3 rounded-full text-white ${stat.color}`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-lg font-semibold">{stat.value}</p>
              <p className="text-gray-700">{stat.title}</p>
            </div>
          </motion.div>
        ))}
      </div>

     
      <div className="flex items-center justify-between mt-6">
        <select
          className="border p-2 rounded-md"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          {[...Array(5)].map((_, i) => {
            const year = new Date().getFullYear() - i;
            return (
              <option key={year} value={year}>
                {year}
              </option>
            );
          })}
        </select>

        <div className="flex space-x-3">
          <button
            onClick={() => setGraphType("line")}
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Line
          </button>
          <button
            onClick={() => setGraphType("bar")}
            className="px-4 py-2 bg-green-500 text-white rounded-md"
          >
            Bar
          </button>
        </div>
      </div>

      <motion.div
        key={`${selectedYear}-${selectedMetric}-${graphType}`}
        className="mt-6 bg-gray-100 p-6 rounded-lg shadow-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-lg font-semibold mb-4">
          {stats.find((stat) => stat.key === selectedMetric)?.title} Overview (
          {selectedYear})
        </h2>
        {graphType === "line" ? (
          <Line data={chartData} />
        ) : (
          <canvas
            ref={barChartCanvasRef}
            id={`bar-chart-${selectedMetric}-${selectedYear}`}
          />
        )}
      </motion.div>
    </div>
  );
};

export default Dashboard;