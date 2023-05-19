import { createSlice } from '@reduxjs/toolkit'
//global state data is populated here
const initialState = {
  products: [],
  
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action)=>{
      state.products.push(action.payload)
    
    },
    //remove item from cart
    removeItem: (state,action)=>{
        
    },
    //remove all item from cart
    resetCart: (state)=>{
     
    }
  },
})

// Action creators are generated for each case reducer function
export const { addToCart ,removeItem,resetCart } = cartSlice.actions;

export default cartSlice.reducer