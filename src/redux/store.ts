import { configureStore } from '@reduxjs/toolkit';
import commentsReducer from '@/redux/store/comments';
import darkmodeReducer from '@/redux/store/darkmood';
import discountsReducer from '@/redux/store/discounts';
import ordersReducer from '@/redux/store/orders';
import productsReducer from '@/redux/store/products';
import usersReducer from '@/redux/store/users';

 const store = configureStore({
  reducer: {
    darkmode: darkmodeReducer,
    products:productsReducer,
    comments:commentsReducer,
    orders:ordersReducer,
    discount:discountsReducer,
    users:usersReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
