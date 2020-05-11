import React from "react";
import Chart from "react-apexcharts";

const series = [
  {
    name: "High - 2013",
    data: [28, 56, 35, 105, 50, 70, 44],
  },
];

const options = {
  chart: {
    height: 350,
    type: "line",
  },
  colors: ["#1f8ef1"],
  stroke: {
    curve: "smooth",
  },
  markers: {
    size: 5,
  },
  dataLabels: {
    enabled: true,
    offsetX: 20,
    formatter: function (val: number) {
      return val + "K";
    },
    style: {
      colors: ["#1e1e2e"],
    },
    background: {
      enabled: true,
    },
  },
  annotations: {},
  grid: {
    borderColor: "#263350",
    yaxis: {
      lines: {
        show: false,
      },
    },
    xaxis: {
      lines: {
        show: true,
      },
    },
  },
  xaxis: {
    categories: [
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
    axisBorder: {
      show: false,
    },
  },
  yaxis: {
    min: 20,
    max: 120,
    labels: {
      formatter: function (value: number) {
        return value + "K";
      },
    },
  },
};

const MainExpensesGraph: React.FC = () => (
  <Chart options={options} series={series} type="line" height={350} />
);

export { MainExpensesGraph };
