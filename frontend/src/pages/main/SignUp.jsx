import { Button, Paper, TextField } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { signUp } from "../../services/apiServices";
import { toast } from "react-toastify";

function SignUp() {
  const navigate = useNavigate();

  const goToSignIn = () => {
    navigate("/signin");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (e.target["password"].value !== e.target["confirmPassword"].value) {
      alert("Password must match!");
      return;
    }
    const formData = new FormData(e.target);

    const result = await signUp(formData);

    if (result.success) {
      toast.success("Signed-up successfully!");
      navigate("/signin");
    } else {
      toast.error(result.msg);
    }
  };

  return (
    <div className="p-8 flex items-center justify-center">
      <Paper
        component={"form"}
        variant="outlined"
        className="p-4 mx-auto max-w-[500px]"
        onSubmit={handleSubmit}
      >
        <div>
          <h2 className="text-2xl mb-4">Sign Up</h2>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <TextField id="fname" name="fname" label="First Name" />
            <TextField id="lname" name="lname" label="Last Name" />
          </div>
          <TextField id="email" name="email" label="Email" />
          <TextField
            id="password"
            name="password"
            label="Password"
            type="password"
          />
          <TextField
            id="confirmPassword"
            name="confirmPassword"
            label="Confirm Password"
            type="password"
          />
          <div className="flex flex-col gap-2">
            <Button variant="contained" type="submit">
              Sign Up
            </Button>
            <p className="text-center">or</p>
            <Button variant="outlined" onClick={goToSignIn}>
              Log In
            </Button>
          </div>
        </div>
      </Paper>
    </div>
  );
}

export default SignUp;
