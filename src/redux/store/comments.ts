import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Comment from "../../models/commentType";
import apiRequests from "../../services/configs";

interface CommentState {
  comments: Comment[];
  loading: boolean;
}

const initialState: CommentState = {
  comments: [],
  loading: false
};
export const fetchComment = createAsyncThunk(
  "comment/fetch",
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
export const removeComment = createAsyncThunk(
  "comment/remove",
  async (id:any) => {
    return apiRequests.delete(`/comments/${id}`);   
  } 
);
export const commentsSlice = createSlice({
    name: 'comments',
    // `createSlice` will infer the state type from the `initialState` argument
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
      builder.addCase(removeComment.fulfilled, (state, action) =>{state.comments.filter(i=>i.id !== action.meta.arg)  })
    },
  })
     
  export default commentsSlice.reducer

