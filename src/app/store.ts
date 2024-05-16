import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./slices/authSlice"
import productsReducer from "./slices/productsSlice"
import cartReducer from "./slices/cartSlice"
import usersReducer from "./slices/usersSlice"

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    cart: cartReducer,
    users: usersReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
