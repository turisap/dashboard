import React from "react";
import Chart from "react-apexcharts";

const series = [
  {
    name: "Basic needs",
    data: [28, 40, 45, 65, 35],
  },
];

// TODO remove hard-coded months and add current 5 ones

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
  colors: ["#6fe398"],
  stroke: {
    curve: "smooth",
    width: 2,
  },
  markers: {
    size: 3,
    colors: "#6fe398",
    strokeWidth: 0,
    hover: {
      size: 4,
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
  tooltip: {
    enabled: true,
  },
  xaxis: {
    crosshairs: {
      show: false,
    },
    tooltip: {
      enabled: false,
    },
    categories: ["Mar", "Apr", "May", "Jun", "Jul"],
    axisBorder: {
      show: false,
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
    min: 0,
    max: 80,
    tooltip: {
      enabled: false,
    },
    labels: {
      formatter: function (value: number) {
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

const BillsGraph: React.FC = () => (
  <Chart options={options} series={series} type="area" height={250} />
);

export { BillsGraph };
