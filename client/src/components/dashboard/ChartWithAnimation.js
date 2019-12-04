import React, { Component } from "react";
import CanvasJSReact from "./canvasjs.react";
// var CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

class ChartWithAnimation extends Component {
  render() {
    let { countDeal, countNoDeal, pending, totalCustomer } = this.props;
    countDeal = ((countDeal * 100) / totalCustomer).toFixed(2);
    countNoDeal = ((countNoDeal * 100) / totalCustomer).toFixed(2);
    pending = ((pending * 100) / totalCustomer).toFixed(2);
    const options = {
      animationEnabled: true,
      exportEnabled: true,
      theme: "light1", // "light1", "dark1", "dark2"
      data: [
        {
          type: "pie",
          indexLabel: `{label}: {y}%`,
          startAngle: -90,
          dataPoints: [
            { y: countDeal, label: "Deal", color: "#1D976C" },
            { y: countNoDeal, label: "No Deal", color: "#ED213A" },
            { y: pending, label: "Pending", color: "#f9f9f9" }
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

export default ChartWithAnimation;
