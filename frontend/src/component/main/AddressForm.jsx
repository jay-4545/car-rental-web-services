import React from "react";
import { Box, TextField } from "@mui/material";

const AddressForm = ({ address, setAddress }) => {
  const handleChange = (e) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Box className="flex flex-col gap-4">
      <TextField
        label="Address"
        value={address.street}
        onChange={handleChange}
        name="street"
        fullWidth
        required
      />
      <TextField
        label="City"
        value={address.city}
        onChange={handleChange}
        name="city"
        fullWidth
        required
      />
      <div className="flex gap-4">
        <TextField
          label="State"
          value={address.state}
          onChange={handleChange}
          name="state"
          fullWidth
          required
        />
        <TextField
          label="Postal Code"
          value={address.postalCode}
          onChange={handleChange}
          name="postalCode"
          fullWidth
          required
        />
      </div>
    </Box>
  );
};

export default AddressForm;
