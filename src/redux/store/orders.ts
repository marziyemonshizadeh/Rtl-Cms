import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import type Order from "@/models/orderType";
import { ordersApi } from "@/pages/orders/api/ordersApi";
import { getApiError } from "@/services/shared/apiError";
import type { RootState } from "@/redux/store";

interface OrderState {
  orders: Order[];
  loading: boolean;
  error: string | null;
  mutations: Record<string, { pending: boolean; error: string | null }>;
}

const initialState: OrderState = {
  orders: [],
  loading: false,
  error: null,
  mutations: {},
};

type ThunkConfig = { state: RootState; rejectValue: string };

// #region API
export const fetchOrders = createAsyncThunk<Order[], void, ThunkConfig>(
  "order/fetch",
  async (_, { rejectWithValue }) => {
    try {
      return await ordersApi.list();
    } catch (error) {
      return rejectWithValue(getApiError(error));
    }
  },
  {
    condition: (_, { getState }) => {
      const state = getState().orders;
      return !state.loading && !Object.values(state.mutations).some((mutation) => mutation.pending);
    },
  },
);

export const removeOrders = createAsyncThunk<number, number, ThunkConfig>(
  "order/remove",
  async (id, { rejectWithValue }) => {
    try {
      return await ordersApi.remove(id);
    } catch (error) {
      return rejectWithValue(getApiError(error));
    }
  },
  {
    condition: (id, { getState }) => {
      const state = getState().orders;
      return !state.loading && !state.mutations[id]?.pending;
    },
  },
);

export const setOrderConfirmation = createAsyncThunk<Order, { id: number; confirmation: boolean }, ThunkConfig>(
  "order/confirmation",
  async ({ id, confirmation }, { rejectWithValue }) => {
    try {
      return await ordersApi.setConfirmation(id, confirmation);
    } catch (error) {
      return rejectWithValue(getApiError(error));
    }
  },
  {
    condition: ({ id }, { getState }) => {
      const state = getState().orders;
      return !state.loading && !state.mutations[id]?.pending;
    },
  },
);
// #endregion

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "دریافت اطلاعات انجام نشد.";
      })
      .addCase(removeOrders.fulfilled, (state, action) => {
        state.orders = state.orders.filter((item) => item.id !== action.payload);
        state.mutations[String(action.meta.arg)] = { pending: false, error: null };
      })
      .addCase(setOrderConfirmation.fulfilled, (state, action) => {
        state.orders = state.orders.map((item) => item.id === action.payload.id ? action.payload : item);
        state.mutations[String(action.meta.arg.id)] = { pending: false, error: null };
      })
      .addMatcher(isAnyOf(removeOrders.pending, setOrderConfirmation.pending), (state, action) => {
        const arg = action.meta.arg;
        const key = typeof arg === "number" ? String(arg) : String(arg.id);
        state.mutations[key] = { pending: true, error: null };
      })
      .addMatcher(isAnyOf(removeOrders.rejected, setOrderConfirmation.rejected), (state, action) => {
        const arg = action.meta.arg;
        const key = typeof arg === "number" ? String(arg) : String(arg.id);
        state.mutations[key] = { pending: false, error: action.payload ?? "درخواست انجام نشد." };
      });
  },
});

export default ordersSlice.reducer;
