import React from "react";
import { useAppDispatch, useAppSelector } from "../redux/store";
import Spinner from "../components/Spinner";
import Table from "../components/Table";
import { v4 as uuidv4 } from "uuid";

function TableContainer() {
  const { data, loading, error } = useAppSelector(state => state.data);

  if (loading || !data) {
    return <Spinner />;
  }

  return (
    <div>
      <Table />
    </div>
  );
}

export default TableContainer;
