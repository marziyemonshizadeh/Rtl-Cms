import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Order from "../../models/orderType";
import apiRequests from "../../services/configs";

interface OrderState {
  orders: Order[];
}

const initialState: OrderState = {
  orders: [],
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
      // addOrder: (state,action: PayloadAction<{name: string}>) => {
      //     state.orders.push({
      //         product: action.payload.name,
      //         customer: action.payload.name,
      //         orderDate: action.payload.name,
      //           price: state.orders.length,
      //           orderTime: action.payload.name,
      //           discount: action.payload.name,
      //   });
      // },
    },
    extraReducers: (builder) => {
      builder.addCase(fetchOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
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
  
  // export const { addOrder } = ordersSlice.actions
   
  export default ordersSlice.reducer

