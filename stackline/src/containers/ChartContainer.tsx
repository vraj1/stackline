import React from "react";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { LineChart, Line, XAxis, Tooltip } from "recharts";
import Spinner from "../components/Spinner";
import { format } from "date-fns";
function ChartContainer() {
  const { data, loading, error } = useAppSelector(state => state.data);
  if (loading || !data) return <Spinner />;
  const formatMonths = data.sales.map((sale: {
    weekEnding: string,
    retailSales: number,
    wholesaleSales: number,
    unitsSold: number,
    retailerMargin: number
}) =>{
    console.log(sale.weekEnding)
      const year = parseInt(sale.weekEnding.split('-')[0])
      const month = parseInt(sale.weekEnding.split('-')[1]) - 1 //january starts at 0
      const day = parseInt(sale.weekEnding.split('-')[2])
      const newDate = new Date(year, month, day)
      return {
          ...sale,
          //months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun" , "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"]
          months: newDate.toLocaleString('default', {month: 'short'})
      }
    })

  
  console.log(formatMonths)

  return (
    <div>
      <div id="chart">
        <LineChart width={1000} height={400} data={formatMonths}>
          <XAxis dataKey="weekEnding" xAxisId="0" axisLine={false} hide={true}/>  
          <XAxis dataKey="months" interval="preserveStartEnd" xAxisId="1" allowDuplicatedCategory={false}/>
          <Tooltip />
          <Line type="monotone" dataKey="retailSales" stroke="#40a8ef" dot={false} />
          <Line type="monotone" dataKey="wholesaleSales" stroke="#3c4858" dot={false} />
        </LineChart>
      </div>
    </div>
  );
}

export default ChartContainer;
