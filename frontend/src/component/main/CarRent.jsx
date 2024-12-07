import { Box, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import React, { useState } from "react";

function CarRent({
  bookingDate,
  setBookingDate,
  state,
  user,
  totalPrice,
  setTotalPrice,
}) {
  // console.log("user", user);
  // const [formState, setFormState] = useState({
  //   startDate: null,
  //   endDate: null,
  // });

  // const handleChange = (e) => {
  // //   setBookingDate({
  // //     ...bookingDate,
  // //   });
  // // };

  // const handleSubmit = async () => {
  //   await addBooking({ ...formState, carId });
  //   if (formState.startDate && formState.endDate) {
  //     // dispatch(addToBooking(formState.startDate));
  //     navigate("/confirmBooking");
  //   } else {
  //     toast.error("Please select both start and end dates.");
  //   }
  // };

  const handleDateChange = (name, value) => {
    const updatedDates = { ...bookingDate, [name]: value };
    setBookingDate(updatedDates);

    // Calculate total price
    if (updatedDates.startDate && updatedDates.endDate) {
      const start = new Date(updatedDates.startDate);
      const end = new Date(updatedDates.endDate);
      const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
      const calculatedPrice = days * state.rentalPrice;
      setTotalPrice(calculatedPrice);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Typography variant="body1">User Name: {user.fame}</Typography>
        <Typography variant="body1">Car Name: {state.name}</Typography>
      </div>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Box className="grid grid-cols-2 gap-4">
          <DatePicker
            label="Start Date"
            value={bookingDate.startDate}
            // onChange={handleChange}
            onChange={(value) => handleDateChange("startDate", value)}
            minDate={new Date()}
            name="startDate"
            // renderInput={(params) => <TextField {...params} />}
          />

          <DatePicker
            label="End Date"
            value={bookingDate.endDate}
            // onChange={handleChange}
            onChange={(value) => handleDateChange("endDate", value)}
            minDate={bookingDate.startDate || new Date()}
            name="endDate"
            // renderInput={(params) => <TextField {...params} />}
          />
        </Box>
      </LocalizationProvider>
      <Typography variant="body1">
        Car Price (24 hours): {state.rentalPrice}
      </Typography>
      <Typography variant="body1">Total Price: ₹{totalPrice}</Typography>
    </div>
  );
}

export default CarRent;
