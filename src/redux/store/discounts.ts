import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import type Discount from "@/models/discountType";
import { discountsApi } from "@/pages/discounts/api/discountsApi";
import { getApiError } from "@/services/shared/apiError";
import type { RootState } from "@/redux/store";

interface DiscountState {
  discounts: Discount[];
  loading: boolean;
  error: string | null;
  mutations: Record<string, { pending: boolean; error: string | null }>;
}

const initialState: DiscountState = {
  discounts: [],
  loading: false,
  error: null,
  mutations: {},
};

type ThunkConfig = { state: RootState; rejectValue: string };

// #region API
export const fetchDiscounts = createAsyncThunk<Discount[], void, ThunkConfig>(
  "discount/fetch",
  async (_, { rejectWithValue }) => {
    try {
      return await discountsApi.list();
    } catch (error) {
      return rejectWithValue(getApiError(error));
    }
  },
  {
    condition: (_, { getState }) => {
      const state = getState().discount;
      return !state.loading && !Object.values(state.mutations).some((mutation) => mutation.pending);
    },
  },
);

export const removeDiscounts = createAsyncThunk<number, number, ThunkConfig>(
  "discount/remove",
  async (id, { rejectWithValue }) => {
    try {
      return await discountsApi.remove(id);
    } catch (error) {
      return rejectWithValue(getApiError(error));
    }
  },
  {
    condition: (id, { getState }) => {
      const state = getState().discount;
      return !state.loading && !state.mutations[id]?.pending;
    },
  },
);

export const setDiscountConfirmation = createAsyncThunk<Discount, { id: number; confirmation: boolean }, ThunkConfig>(
  "discount/confirmation",
  async ({ id, confirmation }, { rejectWithValue }) => {
    try {
      return await discountsApi.setConfirmation(id, confirmation);
    } catch (error) {
      return rejectWithValue(getApiError(error));
    }
  },
  {
    condition: ({ id }, { getState }) => {
      const state = getState().discount;
      return !state.loading && !state.mutations[id]?.pending;
    },
  },
);
// #endregion

const discountsSlice = createSlice({
  name: "discounts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDiscounts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDiscounts.fulfilled, (state, action) => {
        state.loading = false;
        state.discounts = action.payload;
      })
      .addCase(fetchDiscounts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "دریافت اطلاعات انجام نشد.";
      })
      .addCase(removeDiscounts.fulfilled, (state, action) => {
        state.discounts = state.discounts.filter((item) => item.id !== action.payload);
        state.mutations[String(action.meta.arg)] = { pending: false, error: null };
      })
      .addCase(setDiscountConfirmation.fulfilled, (state, action) => {
        state.discounts = state.discounts.map((item) => item.id === action.payload.id ? action.payload : item);
        state.mutations[String(action.meta.arg.id)] = { pending: false, error: null };
      })
      .addMatcher(isAnyOf(removeDiscounts.pending, setDiscountConfirmation.pending), (state, action) => {
        const arg = action.meta.arg;
        const key = typeof arg === "number" ? String(arg) : String(arg.id);
        state.mutations[key] = { pending: true, error: null };
      })
      .addMatcher(isAnyOf(removeDiscounts.rejected, setDiscountConfirmation.rejected), (state, action) => {
        const arg = action.meta.arg;
        const key = typeof arg === "number" ? String(arg) : String(arg.id);
        state.mutations[key] = { pending: false, error: action.payload ?? "درخواست انجام نشد." };
      });
  },
});

export default discountsSlice.reducer;
