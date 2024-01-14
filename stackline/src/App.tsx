import React from 'react';
import './assets/styles/App.css';
import ChartContainer from './containers/ChartContainer';
import TableContainer from './containers/TableContainer';
import Product from './components/Product';
import Header from './components/Header';



function App() {
  return (
    <div className="grid-container">
      <div className="header-container">
          <Header />
        </div>
      <div className="product-container">
        <Product />
      </div>
      
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
