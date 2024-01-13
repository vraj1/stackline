import React from 'react';
import './styles/App.css';
import { useEffect, useState } from 'react';

import ChartContainer from './containers/ChartContainer';
import TableContainer from './containers/TableContainer';
import Product from './components/Product'
import {getProductData} from './redux/reducers'
import {useAppDispatch, useAppSelector} from './redux/store'


function App() {
  return (
    <div className="grid-container">
      <Product />
      <div className="chart-container">
        <ChartContainer />
      </div>
      <div className="table-container">
        <TableContainer />
      </div>
    </div>
  );
}

export default App
