import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  ChartOptions,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { colors, linearGradient } from "../../constants";
import CustomSegmentedToggle, {
  CustomSegmentedToggleOption,
} from "../../components/CustomSegmentedToggle";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const EarningsGrowthChart = () => {
  const [view, setView] = useState<"Year" | "Month">("Year");

  const toggleOptions: CustomSegmentedToggleOption<"Year" | "Month">[] = [
    {
      label: "Year",
      value: "Year",
      bgColor: linearGradient,
      textColor: colors.white,
    },
    {
      label: "Month",
      value: "Month",
      bgColor: linearGradient,
      textColor: colors.white,
    },
  ];

  // Dynamic labels and dataset based on view
  const labels =
    view === "Year"
      ? ["2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023"]
      : ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"];

  const earningsData =
    view === "Year" ? [8, 9, 10, 14, 18, 22, 26, 30] : [1, 1.5, 2, 2.5, 3];

  const data = {
    labels,
    datasets: [
      {
        label: "Earnings",
        data: earningsData,
        fill: true,
        borderColor: colors.primary,
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        tension: 0.4,
        pointRadius: 0,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => `₹${context.parsed.y}L`,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: colors.grey1,
          font: { size: 12, weight: 500 },
        },
        grid: { display: false },
      },
      y: {
        ticks: {
          stepSize: view === "Year" ? 10 : 0.5,
          callback: function (tickValue) {
            if (typeof tickValue === "number") {
              return `₹${tickValue}L`;
            }
            return tickValue;
          },
          color: colors.grey1,
          font: { size: 12, weight: 500 },
        },
        grid: { color: colors.grey2 },
      },
    },
  };

  return (
    <Box
      sx={{
        borderRadius: 3,
        backgroundColor: "#F9FAFB",
        height: 260,
        mt: 1,
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography fontWeight={600}>Earnings Growth</Typography>
        <CustomSegmentedToggle
          options={toggleOptions}
          selected={view}
          onChange={(newValue) => {
            if (newValue !== view) {
              setView(newValue);
            }
          }}
          thumbColor={colors.lightGrey3}
          sx={{ minWidth: 30 }}
        />
      </Box>
      <Box height={200}>
        <Line data={data} options={options} />
      </Box>
    </Box>
  );
};

export default EarningsGrowthChart;
