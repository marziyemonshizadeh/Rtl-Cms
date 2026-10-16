import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Comment from "@/models/commentType";
import apiRequests from "@/services/configs/axios";

interface CommentState {
  comments: Comment[] | undefined;
  loading: boolean;
}

const initialState: CommentState = {
  comments: [],
  loading: false
};
// #region API
export const fetchComment = createAsyncThunk(
  "comment/fetch",
  async (values: string) => {
    return apiRequests
    .get<Comment[]>(values)
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
export const removeComment = createAsyncThunk(
  "comment/remove",
  async (id: Comment["id"] | undefined) => {
    return apiRequests.delete(`/comments/${id}`);   
  } 
);
// #endregion

export const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
      builder.addCase(fetchComment.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload;
      }),
      builder.addCase(fetchComment.pending, (state) => {
        state.loading = true;
      }),
      builder.addCase(removeComment.fulfilled, (state, action) =>{state.comments?.filter(i=>i.id !== action.meta.arg)  })
    },
  })
     
  export default commentsSlice.reducer

