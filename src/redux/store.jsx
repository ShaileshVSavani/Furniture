import { configureStore } from "@reduxjs/toolkit";
import { cartReducer} from "./cartSlice";
import { wishListReducer } from "./wishListSlice";
import { productReducer } from "./productSlice";
import { userReducer } from "./userSlice";
import { orderReducer } from "./orderSlice";


const store = configureStore({
  reducer: {
     
    // cart : userApi
    cart: cartReducer,
    wishlist: wishListReducer,
    product: productReducer,
    users: userReducer,
    order: orderReducer
  }
 
})

export default store;