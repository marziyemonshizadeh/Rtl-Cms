import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Comment from "../../models/commentType";
import apiRequests from "../../services/configs";

interface CommentState {
  comments: Comment[];
}

const initialState: CommentState = {
  comments: [],
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
export const commentsSlice = createSlice({
    name: 'comments',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
      addComment: (state,action: PayloadAction<{name: string}>) => {
        state.comments.push({
          id: state.comments.length,
          name: action.payload.name,
          product: action.payload.name,
          history: action.payload.name,
          time: action.payload.name,
        });
      },
    },
    extraReducers: (builder) => {
      builder.addCase(fetchComment.fulfilled, (state, action) => {
        state.comments = action.payload;
      });
    },
  })
  
  export const { addComment } = commentsSlice.actions
   
  export default commentsSlice.reducer

