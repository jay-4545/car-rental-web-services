import { Box, Button } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { verifyEmail } from "../../services/apiServices";

function VerifyEmail() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    verifyEmail(searchParams.get("userId"), searchParams.get("token"))
      .then((data) => {})
      .catch((error) => {
        console.log("Error: ", error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div className="border rounded max-w-[600px] mx-auto p-4">
      <p className="text-3xl mb-2 text-green-700">
        You email has been verified.
      </p>
      <p className="mb-8">Now you can login.</p>
      <Button variant="contained" LinkComponent={Link} to="/signin">
        Go to Login
      </Button>
    </div>
  );
}

export default VerifyEmail;
