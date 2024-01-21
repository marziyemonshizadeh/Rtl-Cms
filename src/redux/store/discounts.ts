import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Discount from "../../models/discountType";
import apiRequests from "../../services/configs";

interface DiscountState {
  discounts: Discount[];
  loading: boolean;
}

const initialState: DiscountState = {
    discounts: [],
    loading: false
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
export const removeDiscounts = createAsyncThunk(
  "discount/remove",
  async (id:any) => {
    return apiRequests.delete(`/discounts/${id}`);   
  } 
);
export const discountsSlice = createSlice({
    name: 'discounts',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
      builder.addCase(fetchDiscounts.fulfilled, (state, action) => {
        state.loading = false;
        state.discounts = action.payload;
      }),
      builder.addCase(fetchDiscounts.pending, (state) => {
        state.loading = true;
      })
    },
  })
     
  export default discountsSlice.reducer

