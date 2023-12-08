import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Product from "../../models/productType";
import apiRequests from "../../services/configs";

interface ProductState {
  products: Product[];
  loading: boolean;
}

const initialState: ProductState = {
  products: [],
  loading: false
};
export const fetchProduct = createAsyncThunk(
  "product/fetch",
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
export const removeProduct = createAsyncThunk(
  "product/remove",
  async (id:any) => {
    return apiRequests.delete(`/products/${id}`);   
  } 
);

export const productsSlice = createSlice({
    name: 'products',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
      builder.addCase(fetchProduct.fulfilled, (state, action) => {
        state.loading = false;
       state.products = action.payload;
      }),
      builder.addCase(fetchProduct.pending, (state) => {
        state.loading = true;
      }),
      builder.addCase(removeProduct.fulfilled, (state, action) => {
        console.log("state remove fulfilled :",state.products);
        console.log("action remove fulfilled:", action);
        const newProducts = state.products.filter(i=>i.id !== action.meta.arg)
        // return newProducts;
        // return state.products.filter(i=>i.id !== action.meta.arg)
        // return newProducts;
      })
    },
  })
  
   
  export default productsSlice.reducer

