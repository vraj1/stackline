import React from "react";
import { useState } from "react";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ExpandLess from "@mui/icons-material/ExpandLess";
import { sortData } from "../redux/reducers";
import { useAppDispatch, useAppSelector } from "../redux/store";
import Spinner from "../components/Spinner";
import { v4 as uuidv4 } from "uuid";

interface Map {
  [key: string]: string | undefined;
}

function Table() {
  const { data, loading, error } = useAppSelector(state => state.data);
  const [sortDirection, setSortDirection] = useState<Map>({
    weekEnding: "ascending",
    retailSales: "ascending",
    wholesaleSales: "ascending",
    unitsSold: "ascending",
    retailerMargin: "ascending"
  });
  const dispatch = useAppDispatch();
  if (loading || !data) {
    return <Spinner />;
  }
  // function arrowDirection(){
  //     return sortDirection === 'ascending' ? <ExpandMore/> : <ExpandLess />
  // }
  interface Map {
    [key: string]: string | undefined;
  }
  const onClickHandler = (key: string) => {
    const currentDirection =
      sortDirection[key] === "ascending" ? "descending" : "ascending";
    const updatedDirection = Object.assign(
      {},
      (sortDirection[key] = currentDirection)
    );

    dispatch(sortData(key));
    setSortDirection(sortDirection => ({
      ...sortDirection,
      updatedDirection
    }));
  };

  return (
    <div id="table">
      <table>
        <thead>
          <tr>
            <th scope="col" onClick={e => onClickHandler("weekEnding")}>
              <div>
                WEEK ENDING
                <span className="arrowIcon">
                  {" "}
                  {sortDirection["weekEnding"] === "ascending" ? (
                    <ExpandMore />
                  ) : (
                    <ExpandLess />
                  )}
                </span>
              </div>
            </th>
            <th scope="col" onClick={e => onClickHandler("retailSales")}>
              <div>
                RETAIL SALES{" "}
                <span className="arrowIcon">
                  {sortDirection["retailSales"] === "ascending" ? (
                    <ExpandMore />
                  ) : (
                    <ExpandLess />
                  )}
                </span>
              </div>
            </th>
            <th scope="col" onClick={e => onClickHandler("wholesaleSales")}>
              <div>
                WHOLESALE SALES{" "}
                <span className="arrowIcon">
                  {sortDirection["wholesaleSales"] === "ascending" ? (
                    <ExpandMore />
                  ) : (
                    <ExpandLess />
                  )}
                </span>
              </div>
            </th>
            <th scope="col" onClick={e => onClickHandler("unitsSold")}>
              <div>
                UNITS SOLD{" "}
                <span className="arrowIcon">
                  {sortDirection["unitsSold"] === "ascending" ? (
                    <ExpandMore />
                  ) : (
                    <ExpandLess />
                  )}
                </span>
              </div>
            </th>
            <th scope="col" onClick={e => onClickHandler("retailerMargin")}>
              <div>
                RETAILER MARGIN{" "}
                <span className="arrowIcon">
                  {sortDirection["retailerMargin"] === "ascending" ? (
                    <ExpandMore />
                  ) : (
                    <ExpandLess />
                  )}
                </span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {data.sales ? (
            data.sales.map((sale: any) => {
              return (
                <tr key={uuidv4()}>
                  <td>{sale.weekEnding.toLocaleString()}</td>
                  <td>{"$" + sale.retailSales.toLocaleString()}</td>
                  <td>{"$" + sale.wholesaleSales.toLocaleString()}</td>
                  <td>{sale.unitsSold.toLocaleString()}</td>
                  <td>{"$" + sale.retailerMargin.toLocaleString()}</td>
                </tr>
              );
            })
          ) : (
            <tr></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
