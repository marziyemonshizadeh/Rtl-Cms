import { configureStore } from '@reduxjs/toolkit';
import commentsReducer from '@/pages/Comments/store/commentsSlice';
import darkmodeReducer from '@/redux/slices/themeSlice';
import discountsReducer from '@/pages/Discounts/store/discountsSlice';
import ordersReducer from '@/pages/Orders/store/ordersSlice';
import productsReducer from '@/pages/Products/store/productsSlice';
import usersReducer from '@/pages/Users/store/usersSlice';
import themeReducer from '@/redux/store/theme';
import notifications from '@/redux/notifications';

 const store = configureStore({
  reducer: {
    darkmode: darkmodeReducer,
    theme: themeReducer,
    products:productsReducer,
    comments:commentsReducer,
    orders:ordersReducer,
    discount:discountsReducer,
    users:usersReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(notifications),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
