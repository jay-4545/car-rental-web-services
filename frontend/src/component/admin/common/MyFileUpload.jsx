import React from "react";
import { styled } from "@mui/material/styles";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Button, IconButton, Paper } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

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

function MyFileUpload({ imgUrl, setImgUrl, formState, setFormState }) {
  const handleImagesUpload = (e) => {
    const tempUrls = [];
    for (const file of e.target.files) {
      tempUrls.push(URL.createObjectURL(file));
    }
    setImgUrl([...imgUrl, ...tempUrls]);
    setFormState({
      ...formState,
      image: [...formState.image, ...Array.from(e.target.files)],
    });
  };

  const handleImagesRemove = (index) => {
    const newImagesUrl = [...imgUrl];
    newImagesUrl.splice(index, 1);
    const newImages = [...formState.image];
    newImages.splice(index, 1);

    setImgUrl(newImagesUrl);
    setFormState({
      ...formState,
      image: newImages,
    });
  };

  return (
    <div>
      <Paper
        variant="outlined"
        className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 p-4 flex-wrap w-full min-h-[100px]"
      >
        {imgUrl.map((url, index) => {
          return (
            <Paper
              variant="outlined"
              key={index}
              className="relative h-[150px] boeder border-slate-400 rounded-lg overflow-hidden"
            >
              <img src={url} className="w-full h-full object-cover" alt="" />
              <IconButton
                size="small"
                color="error"
                className="!absolute top-[4px] right-[4px] !z-50 !bg-white"
                onClick={() => {
                  handleImagesRemove(index);
                }}
              >
                <DeleteIcon fontSize="inherit" />
              </IconButton>
            </Paper>
          );
        })}
        <Button
          component="label"
          role={undefined}
          variant="outlined"
          tabIndex={-1}
          className="h-[150px]"
          startIcon={<AddCircleOutlineIcon className="!h-[50px] !w-[50px]" />}
        >
          <VisuallyHiddenInput
            type="file"
            multiple={true}
            name="images"
            onChange={handleImagesUpload}
          />
        </Button>
      </Paper>
    </div>
  );
}

export default MyFileUpload;
