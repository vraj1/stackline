import React from 'react'
import { useAppDispatch, useAppSelector } from "../redux/store"; 
import Spinner from "../components/Spinner";
import Table from '../components/Table'
import { v4 as uuidv4 } from "uuid";

function TableContainer() {
    const { data, loading, error } = useAppSelector(state => state.data);

    if (loading || !data) {
      return <Spinner />;
    }
    const rows = data.sales? 
        data.sales.map((sale: any) => {
            return (
                <tr key={uuidv4()}>
            <td>{sale.weekEnding.toLocaleString()}</td>
            <td>{"$" + sale.retailSales.toLocaleString()}</td>
            <td>{"$" + sale.wholesaleSales.toLocaleString()}</td>
            <td>{sale.unitsSold.toLocaleString()}</td>
            <td>{"$" + sale.retailerMargin.toLocaleString()}</td>
          </tr>
            )
        }) : (<tr></tr>)

    
    return (
        <div>
            <Table rows={rows}/>
        </div>
    )
}

export default TableContainer
