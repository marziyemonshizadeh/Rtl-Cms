import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Product, ProductValues } from "../models/product";
import { productsApi } from "../api/productsApi";
import { getApiError } from "@/services/shared/apiError";
import type { RootState } from "@/redux/store";

interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
  mutations: Record<string, { pending: boolean; error: string | null }>;
}

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
  mutations: {},
};

type ThunkConfig = { state: RootState; rejectValue: string };

// #region API
export const fetchProduct = createAsyncThunk<Product[], void, ThunkConfig>(
  "product/fetch",
  async (_, { rejectWithValue }) => {
    try {
      return await productsApi.list();
    } catch (error) {
      return rejectWithValue(getApiError(error));
    }
  },
  {
    condition: (_, { getState }) => {
      const state = getState().products;
      return !state.loading && !Object.values(state.mutations).some((mutation) => mutation.pending);
    },
  },
);

export const removeProduct = createAsyncThunk<number, number, ThunkConfig>(
  "product/remove",
  async (id, { rejectWithValue }) => {
    try {
      return await productsApi.remove(id);
    } catch (error) {
      return rejectWithValue(getApiError(error));
    }
  },
  {
    condition: (id, { getState }) => {
      const state = getState().products;
      return !state.loading && !state.mutations[id]?.pending;
    },
  },
);

export const addProduct = createAsyncThunk<Product, ProductValues, ThunkConfig>(
  "product/create",
  async (values, { rejectWithValue }) => {
    try {
      return await productsApi.create(values);
    } catch (error) {
      return rejectWithValue(getApiError(error));
    }
  },
  {
    condition: (_, { getState }) => {
      const state = getState().products;
      return !state.loading && !state.mutations["create"]?.pending;
    },
  },
);

export const updateProduct = createAsyncThunk<Product, { id: number; changes: ProductValues }, ThunkConfig>(
  "product/update",
  async ({ id, changes }, { rejectWithValue }) => {
    try {
      return await productsApi.update(id, changes);
    } catch (error) {
      return rejectWithValue(getApiError(error));
    }
  },
  {
    condition: ({ id }, { getState }) => {
      const state = getState().products;
      return !state.loading && !state.mutations[id]?.pending;
    },
  },
);
// #endregion

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    clearProductMutationError(state, action: PayloadAction<number>) {
      const mutation = state.mutations[action.payload];
      if (mutation && !mutation.pending) mutation.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "دریافت اطلاعات انجام نشد.";
      })
      .addCase(removeProduct.fulfilled, (state, action) => {
        state.products = state.products.filter((item) => item.id !== action.payload);
        state.mutations[String(action.meta.arg)] = { pending: false, error: null };
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
        state.mutations["create"] = { pending: false, error: null };
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.products = state.products.map((item) => item.id === action.payload.id ? action.payload : item);
        state.mutations[String(action.meta.arg.id)] = { pending: false, error: null };
      })
      .addMatcher(isAnyOf(removeProduct.pending, addProduct.pending, updateProduct.pending), (state, action) => {
        const arg = action.meta.arg;
        const key = typeof arg === "number" ? String(arg) : "id" in arg ? String(arg.id) : "create";
        state.mutations[key] = { pending: true, error: null };
      })
      .addMatcher(isAnyOf(removeProduct.rejected, addProduct.rejected, updateProduct.rejected), (state, action) => {
        const arg = action.meta.arg;
        const key = typeof arg === "number" ? String(arg) : "id" in arg ? String(arg.id) : "create";
        state.mutations[key] = { pending: false, error: action.payload ?? "درخواست انجام نشد." };
      });
  },
});

export const { clearProductMutationError } = productsSlice.actions;
export default productsSlice.reducer;
