import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

function ProductList({ item }) {
  const navigate = useNavigate();

  const goToDetailPage = () => {
    navigate(`/cardetails/${item.slug}`);
  };

  return (
    <div className="flex flex-col items-center" onClick={goToDetailPage}>
      <Card>
        <CardMedia
          component="img"
          height="200"
          image={item.image[0]}
          alt={item.name}
        />

        <CardContent>
          <Typography fontSize="1.5rem">{item.name}</Typography>
          <div className="flex items-center justify-between">
            <Typography variant="h6">{item.model}</Typography>
          </div>
          <div className="flex items-center justify-between">
            <Typography variant="body2" color="text.secondary">
              ₹{item.rentalPrice}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: "10px" }}
            >
              Add to Cart
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default ProductList;
