import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { useSelector } from "react-redux";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

function MyProfile() {
  const [userImage, setUserImage] = useState("");

  const user = useSelector((store) => {
    return store.user.user;
  });

  const handleImageChange = (e) => {
    setUserImage(userImage);
  };

  return (
    <div>
      <Stack direction="row" spacing={2}>
        <Avatar src={userImage} sx={{ width: 150, height: 150 }} />
      </Stack>
      <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<CloudUploadIcon />}
      >
        Upload Photo
        <VisuallyHiddenInput type="file" onChange={handleImageChange} />
      </Button>
    </div>
  );
}

export default MyProfile;
