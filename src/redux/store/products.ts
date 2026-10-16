import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Product from "@/models/productType";
import apiRequests from "@/services/configs/axios";

interface ProductState {
  products: Product[] | undefined;
  loading: boolean;
}

const initialState: ProductState = {
  products: [],
  loading: false
};
// #region API
export const fetchProduct = createAsyncThunk(
  "product/fetch",
  async (values: string) => {
    return apiRequests
    .get<Product[]>(values)
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
export const removeProduct = createAsyncThunk(
  "product/remove",
  async (id: Product["id"] | undefined) => {
    return apiRequests.delete(`/products/${id}`);   
  } 
);

// #endregion

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
      builder.addCase(removeProduct.fulfilled, (state, action) => {state.products?.filter(i=>i.id !== action.meta.arg)

      })
    },
  })
  
   
  export default productsSlice.reducer

