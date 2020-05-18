import React from "react";
import Chart from "react-apexcharts";

const series = [28, 56, 35, 105, 50, 70, 44];

const options = {
  chart: {
    width: 150,
    type: "donut",
  },
  responsive: [
    {
      breakpoint: 801,
      options: {
        chart: {
          width: 400,
        },
        legend: {
          show: true,
          position: "right",
        },
      },
    },
    {
      breakpoint: 450,
      options: {
        chart: {
          width: 200,
        },
        legend: {
          show: false,
        },
        dataLabels: {
          style: {
            fontSize: "10px",
          },
        },
      },
    },
  ],
  fill: {
    opacity: 0.7,
  },
  labels: [
    "Savings",
    "Health",
    "Bills",
    "Hardware",
    "Food",
    "Petrol",
    "University",
  ],
  stroke: {
    width: 0,
  },
  dataLabels: {
    enabled: true,
  },
  colors: [
    "#338AFF",
    "#33FFC1",
    "#33B5FF",
    "#F4998D",
    "#00CCFE",
    "#EDD4B2",
    "#00FFFF",
  ],
  tooltip: {
    enabled: true,
    style: {
      fontSize: "14px",
      fontFamily: "Open Sans",
      colors: ["#FFFFFF"],
      background: "#FFFFFF",
    },
  },
  legend: {
    show: false,
    fontSize: "14px",
    fontFamily: "Open Sans",
    labels: {
      colors: ["#FFFFFF"],
    },
  },
  plotOptions: {
    pie: {
      donut: {
        labels: {
          total: {
            show: true,
            showAlways: true,
            label: "Total",
            fontSize: "22px",
            fontFamily: "Open Sans",
            fontWeight: 600,
            color: "#373d3f",
          },
        },
      },
    },
  },
};

const ExpenseGroupsPie: React.FC = () => (
  <Chart options={options} series={series} type="donut" />
);

export { ExpenseGroupsPie };
