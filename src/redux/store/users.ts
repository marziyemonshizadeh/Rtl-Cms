import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import User from "../../models/userType";
import apiRequests from "../../services/configs";

interface UsersState {
  users: User[];
  loading: boolean;
}

const initialState: UsersState = {
  users: [],
  loading: false
};
export const fetchUser = createAsyncThunk(
  "user/fetch",
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
export const removeUser = createAsyncThunk(
  "user/remove",
  async (id:any) => {
    return await apiRequests.delete(`/users/${id}`);   
  } 
);
export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
      addComment: (state,action: PayloadAction<{name: string}>) => {
        state.users.push({
          id: state.users.length,
          customer: action.payload.name,
          userName: action.payload.name,
          password: action.payload.name,
          phoneNumber: action.payload.name,
          email: action.payload.name
        });
      },
    },
    extraReducers: (builder) => {
      builder.addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      }),
      builder.addCase(fetchUser.pending, (state, action) => {
        state.loading = true;
      }),
      builder.addCase(removeUser.fulfilled, (state, action) => {
        console.log("state remove fulfilled :",state.users);
        console.log("action remove fulfilled:", action);
        const newusers = state.users.filter(i=>i.id !== action.meta.arg)  
      })
    },
  })
  
  export const { addComment } = usersSlice.actions
   
  export default usersSlice.reducer

