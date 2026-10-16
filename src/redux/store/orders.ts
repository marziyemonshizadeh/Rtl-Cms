import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Order from "@/models/orderType";
import apiRequests from "@/services/configs/axios";

interface OrderState {
  orders: Order[] | undefined;
  loading: boolean;
}

const initialState: OrderState = {
  orders: [],
  loading: false
};
// #region API
export const fetchOrders = createAsyncThunk(
  "order/fetch",
  async (values: string) => {
    return apiRequests
    .get<Order[]>(values)
    .then((res) => {
      console.log("get post called");
      return res.data;
    })
    .catch((err: unknown) => {
      console.log("err:", err);
      return undefined;
    });
  } 
);
export const removeOrders = createAsyncThunk(
  "order/remove",
  async (id: Order["id"] | undefined) => {
    return apiRequests.delete(`/orders/${id}`);   
  } 
);
// #endregion

export const ordersSlice = createSlice({
    name: 'orders',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
      builder.addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      }),
      builder.addCase(fetchOrders.pending, (state) => {
        state.loading = true;
      }),
      builder.addCase(removeOrders.fulfilled, (state, action) => {state.orders?.filter(i=>i.id !== action.meta.arg)})
    },
  })
     
  export default ordersSlice.reducer

