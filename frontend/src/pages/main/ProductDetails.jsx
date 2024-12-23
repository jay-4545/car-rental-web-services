import { Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CarRent from "../../component/main/CarRent";
import { getCarBySlug } from "../../services/apiServices";

function ProductDetails() {
  const params = useParams();
  const [carData, setCarData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getCarBySlug([params.slug]).then((data) => {
      setCarData(data.data);
    });
  }, [params.slug]);

  const goToBooking = () => {
    navigate("/confirmBooking", {
      state: carData,
    });
  };

  if (!carData) return null;

  return (
    <div className="grid grid-cols-2 gap-8 p-12">
      <div className="grid grid-cols-2 gap-4 overflow-hidden">
        {carData?.image.map((data) => {
          return (
            <img
              className="w-full h-full object-cover rounded-md"
              src={data}
              alt=""
            />
          );
        })}
      </div>

      <div className="flex flex-col gap-3">
        <Typography variant="h4">{carData.name}</Typography>
        <Typography variant="body1">Model: {carData.model}</Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
          {carData.desc}
        </Typography>
        <Typography variant="body2">
          Car Capacity: {carData.capacity}
        </Typography>
        <Typography variant="body2">Fuel Type: {carData.fuel}</Typography>
        <Typography variant="body1" color="primary" sx={{ mt: 2 }}>
          Price (24 hours) : ₹{carData.rentalPrice}
        </Typography>
        <Button variant="contained" onClick={goToBooking}>
          Confirm Booking
        </Button>
      </div>
    </div>
  );
}

export default ProductDetails;
