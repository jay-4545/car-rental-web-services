import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminPageTitle from "../../../component/admin/common/AdminPageTitle";
import MyFileUpload from "../../../component/admin/common/MyFileUpload";
import { addCar, getCar, updateCar } from "../../../services/apiServices";

const fuelType = ["Petrol", "Diesel", "Gase"];
const carCapacity = ["xuv", "cedan"];

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

    console.log("formData", Array.from(formData.entries()));

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

  console.log("formState", formState);

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
            <FormControl fullWidth>
              <InputLabel id="fuel-type">Fuel Type</InputLabel>
              <Select
                labelId="fuel-type"
                id="fuel"
                name="fuel"
                value={formState.fuel}
                label="Fuel Type"
                onChange={handleChange}
              >
                {fuelType.map((data, index) => (
                  <MenuItem key={index} value={data}>
                    {data}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
            <FormControl fullWidth>
              <InputLabel id="car-capacity">Capacity</InputLabel>
              <Select
                labelId="car-capacity"
                id="capacity"
                name="capacity"
                value={formState.capacity}
                label="Capacity"
                onChange={handleChange}
              >
                {carCapacity.map((data, index) => (
                  <MenuItem key={index} value={data}>
                    {data}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
