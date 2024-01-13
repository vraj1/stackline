import React from 'react'
import ExpandMore from '@mui/icons-material/ExpandMore'
import ExpandLess from '@mui/icons-material/ExpandLess'
import {sortData} from '../redux/reducers'
import { useAppDispatch, useAppSelector } from "../redux/store"; 
import Spinner from "../components/Spinner";
import { v4 as uuidv4 } from "uuid";

function Table(rows: any) {
    const { data, loading, error } = useAppSelector(state => state.data);
    const dispatch = useAppDispatch();
    if (loading || !data) {
      return <Spinner />;
    }
    return (
        <div id="table">
      <table>
        <thead>
          <tr>
            <th scope="col"  onClick={() => dispatch(sortData("weekEnding"))}>
              <div>
                WEEK ENDING
                <span className="arrowIcon"> <ExpandMore/></span>
              </div>
            </th>
            <th scope="col" onClick={() => dispatch(sortData("retailSales"))}>
              <div>
                RETAIL SALES <span className="arrowIcon"><ExpandMore/></span>
              </div>
            </th>
            <th scope="col">
              <div>
                WHOLESALE SALES <span className="arrowIcon"><ExpandMore/></span>
              </div>
            </th>
            <th scope="col">
              <div>
                UNITS SOLD <span className="arrowIcon"><ExpandMore/></span>
              </div>
            </th>
            <th scope="col" >
              <div>
                RETAILER MARGIN <span className="arrowIcon"><ExpandMore/></span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
        {data.sales? 
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
        }) : (<tr></tr>)}
        </tbody>
      </table>
    </div>
    )
}

export default Table
