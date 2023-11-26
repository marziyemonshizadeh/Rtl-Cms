import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Discount from "../../models/discountType";
import apiRequests from "../../services/configs";

interface DiscountState {
  discounts: Discount[];
}

const initialState: DiscountState = {
    discounts: [],
};
export const fetchDiscounts = createAsyncThunk(
  "discount/fetch",
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
export const discountsSlice = createSlice({
    name: 'discounts',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
      addDiscount: (state,action: PayloadAction<{name: string}>) => {
        state.discounts.push({
          id: state.discounts.length,
          discountCode: action.payload.name,
          discountPercent: action.payload.name,
          history: action.payload.name,
          adminName: action.payload.name,
          product: action.payload.name,
        });
      },
    },
    extraReducers: (builder) => {
      builder.addCase(fetchDiscounts.fulfilled, (state, action) => {
        state.discounts = action.payload;
      });
    },
  })
  
  export const { addDiscount } = discountsSlice.actions
   
  export default discountsSlice.reducer

