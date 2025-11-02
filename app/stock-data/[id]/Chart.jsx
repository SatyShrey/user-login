import { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

const LineChart = ({ stock }) => {
  const [data, setdata] = useState([
    ["Time", " Price"],
    [new Date(Date.now()-9000), stock.price - parseInt(stock.price / 100) * 2],
    [new Date(Date.now()-6000), stock.price - parseInt(stock.price / 100) * 1],
    [new Date(Date.now()-3000), stock.price + parseInt(stock.price / 100) * 3],
    [new Date(Date.now()), stock.price + stock.price],
  ]);

  useEffect(() => {
    const newArray = data;
    newArray.push([new Date(Date.now()), stock.price]);
    newArray.splice(1, 1);
    setdata(newArray);
  }, [stock]);

  const options = {
    title: stock.name,
    curveType: "function",
    legend: { position: "bottom" },
    hAxis: { title: "Time", format: "HH:mm:ss" },
    vAxis: { title: "Price (INR)" },
  };

  return (
    <Chart
      chartType="LineChart"
      width="100%"
      height="400px"
      data={data}
      options={options}
      loader={<div>Loading Chart...</div>}
    />
  );
};

export default LineChart;
