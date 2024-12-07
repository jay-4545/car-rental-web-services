import React, { useState } from "react";
import CarRent from "../../component/main/CarRent";
import AddressForm from "../../component/main/AddressForm";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { addBooking } from "../../services/apiServices";
import { toast } from "react-toastify";

function ConfirmBooking() {
  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    postalCode: "",
  });
  const [bookingDate, setBookingDate] = useState({
    startDate: null,
    endDate: null,
  });
  const [totalPrice, setTotalPrice] = useState(0);

  const { state } = useLocation();

  const user = useSelector((store) => {
    return store.user.user;
  });

  const handleSubmit = async () => {
    try {
      const result = await addBooking({
        startDate: bookingDate.startDate,
        endDate: bookingDate.endDate,
        totalPrice: totalPrice,
        address: address,
        userId: user.userId,
        carId: state._id,
      });

      console.log("result", result);
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="flex flex-col gap-4 p-8">
      <h2 className="text-center text-2xl font-semibold p-4">Checkout Page</h2>
      <div className="grid grid-cols-2 gap-4">
        <CarRent
          bookingDate={bookingDate}
          setBookingDate={setBookingDate}
          state={state}
          user={user}
          totalPrice={totalPrice}
          setTotalPrice={setTotalPrice}
        />
        <AddressForm address={address} setAddress={setAddress} />
      </div>
      <Button
        variant="contained"
        onClick={handleSubmit}
        color="primary"
        sx={{ mt: 2 }}
      >
        Proceed To Buy
      </Button>
    </div>
  );
}

export default ConfirmBooking;
