import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import { dataSlice } from "./reducers";

const store = configureStore({
  reducer: {
    data: dataSlice.reducer
  }
});

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<ReturnType<
  typeof store.getState
>> = useSelector;
export default store;
