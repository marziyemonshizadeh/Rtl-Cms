import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Order from "../../models/orderType";
import apiRequests from "../../services/configs";

interface OrderState {
  orders: Order[];
  loading: boolean;
}

const initialState: OrderState = {
  orders: [],
  loading: false
};
export const fetchOrders = createAsyncThunk(
  "order/fetch",
  async (values:any) => {
    return apiRequests
    .get(values)
    .then((res) => {
      console.log("get post called");
      return res.data;
    })
    .catch((err) => {
      console.log("err:", err);
    });
  } 
);
export const removeOrders = createAsyncThunk(
  "order/remove",
  async (id:any) => {
    return apiRequests.delete(`/orders/${id}`);   
  } 
);
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
      builder.addCase(removeOrders.fulfilled, (state, action) => {
        console.log("state remove fulfilled :",state.orders);
        console.log("action remove fulfilled:", action);
        const newProducts = state.orders.filter(i=>i.id !== action.meta.arg)
        // return newProducts;
        // return state.products.filter(i=>i.id !== action.meta.arg)
        // return newProducts;
      })
    },
  })
     
  export default ordersSlice.reducer

