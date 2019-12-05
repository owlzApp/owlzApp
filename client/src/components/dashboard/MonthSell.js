/* App.js */
import React, { Component } from "react";
import CanvasJSReact from "./canvasjs.react";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class MonthSell extends Component {
  render() {
    const { totalCustomer } = this.props;

    const options = {
      animationEnabled: true,
      title: {
        text: "Number of New Customers"
      },
      axisY: {
        title: "Number of Customers",
        includeZero: false
      },
      toolTip: {
        shared: true
      },
      data: [
        {
          type: "spline",
          name: "2019",
          showInLegend: true,
          dataPoints: [{ y: totalCustomer, label: "Dec" }]
        },
        {
          type: "spline",
          name: "2020",
          showInLegend: true,
          dataPoints: [
            { y: 172, label: "Jan" },
            { y: 173, label: "Feb" },
            { y: 175, label: "Mar" },
            { y: 172, label: "Apr" },
            { y: 162, label: "May" },
            { y: 165, label: "Jun" },
            { y: 172, label: "Jul" },
            { y: 168, label: "Aug" },
            { y: 175, label: "Sept" },
            { y: 170, label: "Oct" },
            { y: 165, label: "Nov" },
            { y: 169, label: "Dec" }
          ]
        }
      ]
    };

    return (
      <div>
        <CanvasJSChart
          options={options}
          /* onRef={ref => this.chart = ref} */
        />
        {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
      </div>
    );
  }
}

export default MonthSell;
