import React from "react";
import { Button, Typography } from "@mui/material";
import Add from "@mui/icons-material/Add";
import { Link } from "react-router-dom";

function AdminPageTitle({ text, hasBtn, btnText, btnLink }) {
  return (
    <div className="flex items-center justify-between">
      <Typography className="text-lg text-gray-600" variant="h4">
        {text}
      </Typography>
      {hasBtn && (
        <Button
          component={Link}
          to={btnLink}
          variant="contained"
          startIcon={<Add />}
        >
          {btnText}
        </Button>
      )}
    </div>
  );
}

export default AdminPageTitle;
