import { createSlice } from "@reduxjs/toolkit";

const bookingSlice = createSlice({
  name: "booking",
  initialState: {
    bookings: [],
  },
  reducers: {
    addToBooking: (state, action) => {
      state.bookings.push(action.payload);
    },
    removeBooking: (state, action) => {
      state.bookings = state.bookings.filter(
        (booking) => booking.id !== action.payload
      );
    },
    clearCart: (state, action) => {
      state.bookings = [];
    },
  },
});

export const { addToBooking, removeBooking, clearCart } = bookingSlice.actions;

export const bookingReducer = bookingSlice.reducer;
