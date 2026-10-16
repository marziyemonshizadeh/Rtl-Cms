import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import type Comment from "@/models/commentType";
import { commentsApi } from "@/pages/comments/api/commentsApi";
import { getApiError } from "@/services/shared/apiError";
import type { RootState } from "@/redux/store";

interface CommentState {
  comments: Comment[];
  loading: boolean;
  error: string | null;
  mutations: Record<string, { pending: boolean; error: string | null }>;
}

const initialState: CommentState = {
  comments: [],
  loading: false,
  error: null,
  mutations: {},
};

type ThunkConfig = { state: RootState; rejectValue: string };

// #region API
export const fetchComment = createAsyncThunk<Comment[], void, ThunkConfig>(
  "comment/fetch",
  async (_, { rejectWithValue }) => {
    try {
      return await commentsApi.list();
    } catch (error) {
      return rejectWithValue(getApiError(error));
    }
  },
  {
    condition: (_, { getState }) => {
      const state = getState().comments;
      return !state.loading && !Object.values(state.mutations).some((mutation) => mutation.pending);
    },
  },
);

export const removeComment = createAsyncThunk<number, number, ThunkConfig>(
  "comment/remove",
  async (id, { rejectWithValue }) => {
    try {
      return await commentsApi.remove(id);
    } catch (error) {
      return rejectWithValue(getApiError(error));
    }
  },
  {
    condition: (id, { getState }) => {
      const state = getState().comments;
      return !state.loading && !state.mutations[id]?.pending;
    },
  },
);

export const setCommentConfirmation = createAsyncThunk<Comment, { id: number; confirmation: boolean }, ThunkConfig>(
  "comment/confirmation",
  async ({ id, confirmation }, { rejectWithValue }) => {
    try {
      return await commentsApi.setConfirmation(id, confirmation);
    } catch (error) {
      return rejectWithValue(getApiError(error));
    }
  },
  {
    condition: ({ id }, { getState }) => {
      const state = getState().comments;
      return !state.loading && !state.mutations[id]?.pending;
    },
  },
);
// #endregion

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchComment.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload;
      })
      .addCase(fetchComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "دریافت اطلاعات انجام نشد.";
      })
      .addCase(removeComment.fulfilled, (state, action) => {
        state.comments = state.comments.filter((item) => item.id !== action.payload);
        state.mutations[String(action.meta.arg)] = { pending: false, error: null };
      })
      .addCase(setCommentConfirmation.fulfilled, (state, action) => {
        state.comments = state.comments.map((item) => item.id === action.payload.id ? action.payload : item);
        state.mutations[String(action.meta.arg.id)] = { pending: false, error: null };
      })
      .addMatcher(isAnyOf(removeComment.pending, setCommentConfirmation.pending), (state, action) => {
        const arg = action.meta.arg;
        const key = typeof arg === "number" ? String(arg) : String(arg.id);
        state.mutations[key] = { pending: true, error: null };
      })
      .addMatcher(isAnyOf(removeComment.rejected, setCommentConfirmation.rejected), (state, action) => {
        const arg = action.meta.arg;
        const key = typeof arg === "number" ? String(arg) : String(arg.id);
        state.mutations[key] = { pending: false, error: action.payload ?? "درخواست انجام نشد." };
      });
  },
});

export default commentsSlice.reducer;
