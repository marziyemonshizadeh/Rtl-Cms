import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Discount from "@/models/discountType";
import apiRequests from "@/services/configs/axios";

interface DiscountState {
  discounts: Discount[] | undefined;
  loading: boolean;
}

const initialState: DiscountState = {
    discounts: [],
    loading: false
};
// #region API
export const fetchDiscounts = createAsyncThunk(
  "discount/fetch",
  async (values: string) => {
    return apiRequests
    .get<Discount[]>(values)
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
export const removeDiscounts = createAsyncThunk(
  "discount/remove",
  async (id: Discount["id"] | undefined) => {
    return apiRequests.delete(`/discounts/${id}`);   
  } 
);
// #endregion

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

