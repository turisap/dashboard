import React from "react";
import Chart from "react-apexcharts";

import { API } from "types/";

import { getCurrentMonths } from "../../utils";

const series = (data) => [
  {
    name: "Total expenses",
    data,
  },
];

const options = {
  chart: {
    height: 350,
    type: "line",
    toolbar: {
      show: false,
    },
  },
  fill: {
    type: "gradient",
    gradient: {
      shade: "dark",
      type: "vertical",
      inverseColors: false,
      opacityFrom: 0.8,
      opacityTo: 0,
      colorStops: [],
    },
  },
  dataLabels: {
    enabled: false,
  },
  colors: ["#1f8ef1"],
  stroke: {
    curve: "smooth",
    width: 2,
  },
  markers: {
    size: 3,
    colors: "#1f8ef1",
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
    padding: {
      right: 20,
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
    categories: getCurrentMonths(12),
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
        fontFamily: "Open Sans",
        fontWeight: 400,
        cssClass: "apexcharts-yaxis-label",
      },
    },
  },
  yaxis: {
    min: 20,
    max: 120,
    labels: {
      formatter: function(value: number) {
        return value + "K";
      },
      show: true,
      align: "right",
      style: {
        colors: "#868689",
        fontSize: "12px",
        fontFamily: "Open Sans",
        fontWeight: 400,
        cssClass: "apexcharts-yaxis-label",
      },
    },
  },
};

const MainExpensesGraph: React.FC<{ data: API.GraphSeries }> = ({ data }) => (
  <Chart options={options} series={series(data)} type="area" height={250} />
);

export { MainExpensesGraph };
