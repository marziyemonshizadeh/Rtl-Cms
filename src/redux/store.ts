import { configureStore } from '@reduxjs/toolkit'
import darkmodeReducer from './store/darkmood'




 const store = configureStore({
  reducer: {
    darkmode: darkmodeReducer
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export default store







// import { configureStore } from "@reduxjs/toolkit";
// import { useDispatch } from 'react-redux';
// // import productsReducer from "../redux/store/products";


// const store = configureStore({
//   reducer: {
//     // products:productsReducer,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: false,
//     }),
// });
// export type RootState = ReturnType<typeof store.getState>
// export type AppDispatch = typeof store.dispatch
// export const useAppDispatch: () => AppDispatch = useDispatch
// export default store;
