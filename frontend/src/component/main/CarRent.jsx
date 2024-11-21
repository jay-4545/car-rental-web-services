import React, { useState } from "react";
import { Button, Box, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";

function CarRent() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleSubmit = () => {
    if (startDate && endDate) {
      alert(
        `Car booking: ${startDate.toLocaleDateString()} to ${endDate.toLocaleDateString()}.`
      );
    } else {
      alert("Please select a date range!");
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box className="flex flex-col gap-4">
        <Typography variant="h6" textAlign="start" gutterBottom>
          Car Booking Date Range Select Karo
        </Typography>
        <DatePicker
          label="Start Date"
          value={startDate}
          onChange={(date) => setStartDate(date)}
          renderInput={(params) => <TextField {...params} />}
        />
        <DatePicker
          label="End Date"
          value={endDate}
          onChange={(date) => setEndDate(date)}
          minDate={startDate}
          renderInput={(params) => <TextField {...params} />}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{ mt: 2 }}
        >
          Confirm Booking
        </Button>
      </Box>
    </LocalizationProvider>
  );
}

export default CarRent;
