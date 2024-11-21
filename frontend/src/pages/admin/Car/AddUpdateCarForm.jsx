import { Button, Paper, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminPageTitle from "../../../component/admin/common/AdminPageTitle";
import MyFileUpload from "../../../component/admin/common/MyFileUpload";
import { addCar, getCar, updateCar } from "../../../services/apiServices";

function AddUpdateCarForm() {
  const { id } = useParams();
  const isAdd = id === "add";
  const navigate = useNavigate();

  const [formState, setFormState] = useState(
    isAdd
      ? {
          name: "",
          slug: "",
          model: "",
          desc: "",
          image: [],
          fuel: "",
          capacity: "",
          rentalPrice: "",
        }
      : null
  );
  const [imgUrl, setImgUrl] = useState([]);

  useEffect(() => {
    if (!isAdd) {
      getCar(id).then((data) => {
        setFormState(data.data);
        setImgUrl(data.data.image);
      });
    }
  }, []);

  const handleChange = (e) => {
    if (e.target.name === "name") {
      setFormState({
        ...formState,
        [e.target.name]: e.target.value,
        slug: e.target.value.toLowerCase().replaceAll(" ", "-"),
      });
    } else {
      setFormState({
        ...formState,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in formState) {
      if (Array.isArray(formState[key])) {
        for (const value of formState[key]) {
          formData.append(key, value);
        }
      } else {
        formData.append(key, formState[key]);
      }
    }

    console.log("formState", formState);

    try {
      if (isAdd) {
        await addCar(formData);
        alert("Car Added!");
        navigate("/admin/cars");
      } else {
        await updateCar(id, formData);
        alert("Car updated!");
        navigate("/admin/cars");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  if (!formState) return null;

  return (
    <div>
      <AdminPageTitle text={(isAdd ? "Add" : "update") + " Car"} />
      <Paper component={"form"} variant="outlined" onSubmit={handleSubmit}>
        <MyFileUpload
          imgUrl={imgUrl}
          setImgUrl={setImgUrl}
          formState={formState}
          setFormState={setFormState}
        />
        <Paper
          variant="outlined"
          className="flex flex-col gap-4 overflow-hidden w-ful p-4"
        >
          <div className="grid grid-cols-2 gap-4">
            <TextField
              id="name"
              label="Car Name"
              variant="outlined"
              name="name"
              value={formState.name}
              onChange={handleChange}
            />
            <TextField
              id="slug"
              label="Car Slug"
              variant="outlined"
              disabled
              name="slug"
              value={formState.slug}
              onChange={handleChange}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <TextField
              id="model"
              label="Car Model"
              variant="outlined"
              name="model"
              value={formState.model}
              onChange={handleChange}
            />
            <TextField
              id="fuel"
              label="Fuel Type"
              variant="outlined"
              name="fuel"
              value={formState.fuel}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <TextField
              id="rentalPrice"
              label="Car Price"
              variant="outlined"
              name="rentalPrice"
              value={formState.rentalPrice}
              onChange={handleChange}
            />
            <TextField
              id="capacity"
              label="Car Capacity"
              variant="outlined"
              name="capacity"
              value={formState.capacity}
              onChange={handleChange}
            />
          </div>
          <TextField
            id="desc"
            label="Car Description"
            name="desc"
            multiline
            maxRows={4}
            variant="outlined"
            onChange={handleChange}
            value={formState.desc}
          />
          <Button type="submit" variant="contained" endIcon={<SendIcon />}>
            Send
          </Button>
        </Paper>
      </Paper>
    </div>
  );
}

export default AddUpdateCarForm;
