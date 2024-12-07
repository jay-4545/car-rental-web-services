// import { Avatar, Button, Paper, Stack, TextField } from "@mui/material";
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { signUp } from "../../services/apiServices";
// import { toast } from "react-toastify";
// import Box from "@mui/material/Box";
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";
// import Select from "@mui/material/Select";

// const role = ["admin", "user"];

// function SignUp() {
//   const navigate = useNavigate();
//   const [imgUrl, setImgUrl] = useState("");

//   const goToSignIn = () => {
//     navigate("/signin");
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (e.target["password"].value !== e.target["confirmPassword"].value) {
//       alert("Password must match!");
//       return;
//     }
//     const formData = new FormData(e.target);

//     const result = await signUp(formData);

//     if (result.success) {
//       toast.success("Signed-up successfully!");
//       navigate("/signin");
//     } else {
//       toast.error(result.msg);
//     }
//   };

//   return (
//     <div className="p-8 flex items-center justify-center">
//       <Paper
//         component={"form"}
//         variant="outlined"
//         className="p-4 mx-auto max-w-[500px]"
//         onSubmit={handleSubmit}
//       >
//         <div>
//           <h2 className="text-2xl text-center mb-4">Sign Up</h2>
//         </div>
//         {/* <Stack> */}
//         <div className="flex items-center justify-center pb-4">
//           <Avatar src={imgUrl} sx={{ width: 75, height: 75 }} />
//         </div>
//         {/* </Stack> */}
//         <div className="flex flex-col gap-4">
//           <div className="flex gap-4">
//             <TextField id="fname" name="fname" label="First Name" />
//             <TextField id="lname" name="lname" label="Last Name" />
//           </div>
//           <TextField id="email" name="email" label="Email" />
//           <FormControl fullWidth>
//             <InputLabel id="demo-simple-select-label">Role</InputLabel>
//             <Select
//               labelId="demo-simple-select-label"
//               id="role"
//               name="role"
//               label="Role"
//             >
//               {role.map((type) => {
//                 return <MenuItem value={type}>{type}</MenuItem>;
//               })}
//             </Select>
//           </FormControl>
//           <TextField
//             id="password"
//             name="password"
//             label="Password"
//             type="password"
//           />
//           <TextField
//             id="confirmPassword"
//             name="confirmPassword"
//             label="Confirm Password"
//             type="password"
//           />
//           <div className="flex flex-col gap-2">
//             <Button variant="contained" type="submit">
//               Sign Up
//             </Button>
//             <p className="text-center">or</p>
//             <Button variant="outlined" onClick={goToSignIn}>
//               Log In
//             </Button>
//           </div>
//         </div>
//       </Paper>
//     </div>
//   );
// }

// export default SignUp;

import React, { useState } from "react";
import {
  Avatar,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { signUp } from "../../services/apiServices";
import { toast } from "react-toastify";

const role = ["admin", "user"];

function SignUp() {
  const navigate = useNavigate();
  const [imgUrl, setImgUrl] = useState("");
  const [imageData, setImageData] = useState("");

  const goToSignIn = () => {
    navigate("/signin");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImgUrl(reader.result);
        setImageData(reader.result.split(",")[1]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (e.target["password"].value !== e.target["confirmPassword"].value) {
      alert("Password must match!");
      return;
    }

    const data = {
      fname: e.target["fname"].value,
      lname: e.target["lname"].value,
      email: e.target["email"].value,
      role: e.target["role"].value,
      password: e.target["password"].value,
      avatar: imageData,
    };

    const result = await signUp(data);

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
        <h2 className="text-2xl text-center mb-4">Sign Up</h2>
        <div className="flex items-center justify-center pb-4 relative">
          <Avatar src={imgUrl} sx={{ width: 75, height: 75 }} />
          <input
            type="file"
            accept="image/*"
            id="fileInput"
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
          <label htmlFor="fileInput">
            <Button
              component="span"
              variant="contained"
              sx={{
                position: "absolute",
                bottom: 10,
                right: 180,
                minWidth: "35px",
                height: "35px",
                borderRadius: "50%",
                padding: 0,
              }}
              color="primary"
            >
              <AddIcon />
            </Button>
          </label>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <TextField id="fname" name="fname" label="First Name" required />
            <TextField id="lname" name="lname" label="Last Name" required />
          </div>
          <TextField id="email" name="email" label="Email" required />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Role</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="role"
              name="role"
              label="Role"
            >
              {role.map((type) => {
                return <MenuItem value={type}>{type}</MenuItem>;
              })}
            </Select>
          </FormControl>
          <TextField
            id="password"
            name="password"
            label="Password"
            type="password"
            required
          />
          <TextField
            id="confirmPassword"
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            required
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
