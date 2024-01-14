import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import axios from "axios";

interface ProductData {
  data: {
    id: string;
    title: string;
    image: string;
    subtitle: string;
    brand: string;
    reviews: Array<{
      customer: string;
      review: string;
      score: number;
    }>;
    retailer: string;
    details: Array<string>;
    tags: Array<string>;
    sales: Array<{
      weekEnding: string;
      retailSales: number;
      wholesaleSales: number;
      unitsSold: number;
      retailerMargin: number;
    }>;
  };
  loading: boolean;
  error: string;
}
interface Sales {
  weekEnding: string;
  retailSales: number;
  wholesaleSales: number;
  unitsSold: number;
  retailerMargin: number;
}

const initialState: ProductData = {
  data: {
    id: "",
    title: "",
    image: "",
    subtitle: "",
    brand: "",
    reviews: [
      {
        customer: "",
        review: "",
        score: 0
      }
    ],
    retailer: "",
    details: [""],
    tags: [""],
    sales: [
      {
        weekEnding: "",
        retailSales: 0,
        wholesaleSales: 0,
        unitsSold: 0,
        retailerMargin: 0
      }
    ]
  },
  loading: false,
  error: ""
};

interface Map {
  [key: string]: string | undefined;
}
const sortDirection: Map = {
  weekEnding: "ascending",
  retailSales: "ascending",
  wholesaleSales: "ascending",
  unitsSold: "ascending",
  retailerMargin: "ascending"
};

export const getProductData = createAsyncThunk(
  "product/fetch",
  async thunkAPI => {
    const response = await axios
      .get("https://api.jsonbin.io/v3/b/65a1c781dc74654018919062")
      .then((res: any) => {
        const data = res.data.record[0];
        return data;
      })
      .catch((err: Error) => {
        console.error(err);
      });
    return response;
  }
);
export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    sortData: (state: any, action: { payload: string }) => {
      if (Object.getOwnPropertyNames(state).length === 0) {
        return state;
      }
      const key = action.payload;
      const sales = state.data.sales.map((sale: any) =>
        Object.assign({}, sale)
      );

      let sortedSales;
      //date sort
      if (key === "weekEnding") {
        sortedSales = sales.sort((a: any, b: any) =>
          sortDirection[key] === "ascending"
            ? new Date(b[key]).getTime() - new Date(a[key]).getTime()
            : new Date(a[key]).getTime() - new Date(b[key]).getTime()
        );
      } else {
        sortedSales = sales.sort((a: any, b: any) =>
          sortDirection[key] === "ascending" ? b[key] - a[key] : a[key] - b[key]
        );
      }

      sortDirection[key] =
        sortDirection[key] === "ascending" ? "descending" : "ascending";

      return Object.assign(state, (state.data.sales = sortedSales));
    }
  },
  extraReducers: builder => {
    builder.addCase(getProductData.pending, (state: any) => {
      state.loading = true;
    });
    builder.addCase(
      getProductData.fulfilled,
      (state: any, action: { payload: any }) => {
        state.loading = false;
        state.data = action.payload;
      }
    );
    builder.addCase(
      getProductData.rejected,
      (state: any, action: { error: any }) => {
        state.error = action.error.message;
      }
    );
  }
});

export const { sortData } = dataSlice.actions;
export default dataSlice.reducer;
