import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import User from "@/models/userType";
import apiRequests from "@/services/configs/axios";

interface UsersState {
  users: User[] | undefined;
  loading: boolean;
}

const initialState: UsersState = {
  users: [],
  loading: false
};
// #region API
export const fetchUser = createAsyncThunk(
  "user/fetch",
  async (values: string) => {
    return apiRequests
    .get<User[]>(values)
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
export const removeUser = createAsyncThunk(
  "user/remove",
  async (id: User["id"] | undefined) => {
    return await apiRequests.delete(`/users/${id}`);   
  } 
);
// #endregion

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
      addComment: (state,action: PayloadAction<{name: string}>) => {
        state.users?.push({
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
      builder.addCase(fetchUser.pending, (state) => {
        state.loading = true;
      }),
      builder.addCase(removeUser.fulfilled, (state, action) => {state.users?.filter(i=>i.id !== action.meta.arg)
      })
    },
  })
  
  export const { addComment } = usersSlice.actions
   
  export default usersSlice.reducer

