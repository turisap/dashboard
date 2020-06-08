import React from "react";
import Chart from "react-apexcharts";

import { API } from "types/";

const series = (data) => [
  {
    name: "Last 7 days",
    data,
  },
];

const mainColor = "#eefa87";

const options = {
  chart: {
    height: 250,
    type: "bar",
    toolbar: {
      show: false,
    },
  },
  grid: {
    borderColor: mainColor,
    strokeDashArray: 0,
    position: "back",
    yaxis: {
      lines: {
        show: false,
      },
    },
    xaxis: {
      lines: {
        show: false,
      },
    },
  },
  color: ["#fefefe"],
  plotOptions: {
    bar: {
      columnWidth: "75%",
      distributed: false,
      dataLabels: {
        position: "top",
      },
    },
  },
  fill: {
    color: mainColor,
    opacity: 0.1,
  },
  colors: [mainColor],
  stroke: {
    width: 1,
  },
  dataLabels: {
    enabled: true,
    offsetY: -30,
    formatter: function(val: number) {
      return val + "K";
    },
    style: {
      fontSize: "14px",
      fontFamily: "Open Sans",
      colors: ["#ffffff"],
    },
  },
  legend: {
    show: false,
  },
  tooltip: {
    enabled: false,
  },
  yaxis: {
    min: 1,
    max: 12,
    labels: {
      formatter: function(value: number) {
        return Math.floor(value) + "K";
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
  xaxis: {
    axisBorder: {
      show: true,
      color: mainColor,
      height: 1,
    },
    axisTicks: {
      show: false,
    },
    categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    labels: {
      style: {
        colors: "#868689",
        fontSize: "12px",
        fontFamily: "Open Sans",
      },
    },
  },
};

const LastWeekGraph: React.FC<{ data: API.GraphSeries }> = ({ data }) => (
  <Chart options={options} series={series(data)} type="bar" height={250} />
);

export { LastWeekGraph };
