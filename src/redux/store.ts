import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import commentsReducer from './store/comments';
import darkmodeReducer from './store/darkmood';
import discountsReducer from './store/discounts';
import ordersReducer from './store/orders';
import productsReducer from './store/products';

 const store = configureStore({
  reducer: {
    darkmode: darkmodeReducer,
    products:productsReducer,
    comments:commentsReducer,
    orders:ordersReducer,
    discount:discountsReducer
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store