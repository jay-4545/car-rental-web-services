import { Button, Paper, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import React from "react";
import { signIn } from "../../services/apiServices";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slice/userSlice";

function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const goToSignUp = () => {
    navigate("/signup");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    try {
      const result = await signIn(formData);

      if (result.token) {
        localStorage.setItem("token", result.token);
        const user = jwtDecode(result.token);
        localStorage.setItem("user", JSON.stringify(user));
        dispatch(setUser(user));
        navigate("/");
        toast.success("Log-in successfully!");
      } else {
        toast.error("Log-in failed!");
      }
    } catch (error) {
      console.log("Error: ", error.message);
    }
  };

  return (
    <div className="p-8 min-h-[calc(100vh-155px)] flex items-center justify-center">
      <Paper
        component={"form"}
        variant="outlined"
        className="p-4 min-w-[400px] max-w-[500px]"
        onSubmit={handleSubmit}
      >
        <div>
          <h2 className="text-2xl mb-4">Log In</h2>
        </div>
        <div className="flex flex-col gap-4">
          <TextField id="email" name="email" label="Email" />
          <TextField
            id="password"
            name="password"
            label="Password"
            type="password"
          />
          <div className="flex flex-col gap-2">
            <Button variant="contained" type="submit">
              Log In
            </Button>
            <p className="text-center">or</p>
            <Button variant="outlined" onClick={goToSignUp}>
              Sign Up
            </Button>
          </div>
        </div>
      </Paper>
    </div>
  );
}

export default SignIn;
