import { configureStore } from '@reduxjs/toolkit'
import cartSlice from 'src/sections/dashboard/purchaseorder/cartSlice'


export const store = configureStore({
  reducer: {
    cart: cartSlice
  },
})