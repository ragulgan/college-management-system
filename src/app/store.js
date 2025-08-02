import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../featureSlice/auth/authSlice"
import userListReducer from "../featureSlice/user/userListSlice"
import userAddReducer from "../featureSlice/user/userAddSlice"
import userUpdateReducer from "../featureSlice/user/userUpdateSlice"

export const store = configureStore({
    reducer: {
      auth: authReducer,

      //users
      user: userListReducer,
      userAdd: userAddReducer,
      userUpdate: userUpdateReducer,
    },
  });