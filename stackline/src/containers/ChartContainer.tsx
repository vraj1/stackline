import React from "react";
import { useAppSelector } from "../redux/store";
import { LineChart, Line, XAxis, Tooltip, Label, YAxis } from "recharts";
import Spinner from "../components/Spinner";

function ChartContainer() {
  const { data, loading, error } = useAppSelector(state => state.data);
  if (loading || !data) return <Spinner />;
  const formatMonths = data.sales.map(
    (sale: {
      weekEnding: string;
      retailSales: number;
      wholesaleSales: number;
      unitsSold: number;
      retailerMargin: number;
    }) => {
      const year = parseInt(sale.weekEnding.split("-")[0]);
      const month = parseInt(sale.weekEnding.split("-")[1]) - 1; //january starts at 0
      const day = parseInt(sale.weekEnding.split("-")[2]);
      const newDate = new Date(year, month, day);
      return {
        ...sale,
        months: newDate
          .toLocaleString("default", { month: "short" })
          .toUpperCase()
      };
    }
  );

  return (
    <div>
      <div id="chart">
        <div id="chart-label">Retail Sales </div>
        <LineChart width={1000} height={400} data={formatMonths}>
          <XAxis
            dataKey="weekEnding"
            xAxisId="0"
            axisLine={false}
            hide={true}
          />
          <XAxis
            dataKey="months"
            height={35}
            tickMargin={15}
            tickLine={false}
            interval="preserveStartEnd"
            xAxisId="1"
            allowDuplicatedCategory={false}
          />
          <YAxis padding={{ top: 100, bottom: 80 }} hide={true} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="retailSales"
            stroke="#40a8ef"
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="wholesaleSales"
            stroke="#3c4858"
            dot={false}
          />
        </LineChart>
      </div>
    </div>
  );
}

export default ChartContainer;
