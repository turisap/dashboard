import React from "react";
import Chart from "react-apexcharts";

const series = [
  {
    name: "Expenses",
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
    width: 2,
  },
  markers: {
    size: 3,
    colors: "red",
    strokeWidth: 0,
    hover: {
      size: 1,
    },
  },
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
    crosshairs: {
      show: false,
    },
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
    tooltip: {
      enabled: false,
    },
    labels: {
      show: true,
      align: "right",
      style: {
        colors: "#868689",
        fontSize: "12px",
        // TODO choose one font for all app
        fontFamily: "Helvetica, Arial, sans-serif",
        fontWeight: 400,
        cssClass: "apexcharts-yaxis-label",
      },
    },
  },
  yaxis: {
    min: 20,
    max: 120,
    labels: {
      formatter: function (value: number) {
        return value + "K";
      },
      show: true,
      align: "right",
      style: {
        colors: "#868689",
        fontSize: "12px",
        // TODO choose one font for all app
        fontFamily: "Helvetica, Arial, sans-serif",
        fontWeight: 400,
        cssClass: "apexcharts-yaxis-label",
      },
    },
  },
};

const MainExpensesGraph: React.FC = () => (
  <Chart options={options} series={series} type="line" height={250} />
);

export { MainExpensesGraph };
