import React from "react";
import { Delete, Edit } from "@mui/icons-material";
import { Avatar, IconButton, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function CarListItem({ car, handleDelete }) {
  return (
    <div>
      <li className="flex items-center gap-4 py-4">
        <Avatar
          alt={car.name}
          src={car.image[0]}
          sx={{
            height: { xs: "2rem", md: "3rem" },
            width: { xs: "2rem", md: "3rem" },
          }}
        />
        <div className="flex-grow-[1]">
          <Typography>{car.name}</Typography>
        </div>
        <div className="shrink-0">
          <IconButton LinkComponent={Link} to={car._id} color="secondary">
            <Edit />
          </IconButton>
          <IconButton
            onClick={() => {
              handleDelete(car._id);
            }}
            color="error"
          >
            <Delete />
          </IconButton>
        </div>
      </li>
    </div>
  );
}

export default CarListItem;
