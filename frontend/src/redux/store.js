import { configureStore } from "@reduxjs/toolkit";
import { bookingReducer } from "./slice/bookingSlice";
import { userReducer } from "./slice/userSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    booking: bookingReducer,
  },
});

export default store;
