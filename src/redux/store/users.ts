import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import type User from "@/models/userType";
import { usersApi } from "@/pages/users/api/usersApi";
import { getApiError } from "@/services/shared/apiError";
import type { RootState } from "@/redux/store";

interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
  mutations: Record<string, { pending: boolean; error: string | null }>;
}

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
  mutations: {},
};

type ThunkConfig = { state: RootState; rejectValue: string };

// #region API
export const fetchUser = createAsyncThunk<User[], void, ThunkConfig>(
  "user/fetch",
  async (_, { rejectWithValue }) => {
    try {
      return await usersApi.list();
    } catch (error) {
      return rejectWithValue(getApiError(error));
    }
  },
  {
    condition: (_, { getState }) => {
      const state = getState().users;
      return !state.loading && !Object.values(state.mutations).some((mutation) => mutation.pending);
    },
  },
);

export const removeUser = createAsyncThunk<number, number, ThunkConfig>(
  "user/remove",
  async (id, { rejectWithValue }) => {
    try {
      return await usersApi.remove(id);
    } catch (error) {
      return rejectWithValue(getApiError(error));
    }
  },
  {
    condition: (id, { getState }) => {
      const state = getState().users;
      return !state.loading && !state.mutations[id]?.pending;
    },
  },
);

export const updateUser = createAsyncThunk<User, { id: number; changes: Omit<User, "id"> }, ThunkConfig>(
  "user/update",
  async ({ id, changes }, { rejectWithValue }) => {
    try {
      return await usersApi.update(id, changes);
    } catch (error) {
      return rejectWithValue(getApiError(error));
    }
  },
  {
    condition: ({ id }, { getState }) => {
      const state = getState().users;
      return !state.loading && !state.mutations[id]?.pending;
    },
  },
);
// #endregion

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "دریافت اطلاعات انجام نشد.";
      })
      .addCase(removeUser.fulfilled, (state, action) => {
        state.users = state.users.filter((item) => item.id !== action.payload);
        state.mutations[String(action.meta.arg)] = { pending: false, error: null };
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.users = state.users.map((item) => item.id === action.payload.id ? action.payload : item);
        state.mutations[String(action.meta.arg.id)] = { pending: false, error: null };
      })
      .addMatcher(isAnyOf(removeUser.pending, updateUser.pending), (state, action) => {
        const arg = action.meta.arg;
        const key = typeof arg === "number" ? String(arg) : String(arg.id);
        state.mutations[key] = { pending: true, error: null };
      })
      .addMatcher(isAnyOf(removeUser.rejected, updateUser.rejected), (state, action) => {
        const arg = action.meta.arg;
        const key = typeof arg === "number" ? String(arg) : String(arg.id);
        state.mutations[key] = { pending: false, error: action.payload ?? "درخواست انجام نشد." };
      });
  },
});

export default usersSlice.reducer;
