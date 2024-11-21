import React, { useEffect, useState } from "react";
import AdminPageTitle from "../../../component/admin/common/AdminPageTitle";
import CarListItem from "../../../component/admin/car/CarListItem";
import { deleteCar, getAllCars } from "../../../services/apiServices";

function CarList() {
  const [car, setCar] = useState(null);

  async function fetchData() {
    try {
      const result = await getAllCars();
      setCar(result.data);
    } catch (error) {
      console.log("Error: ", error.message);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    const useInput = window.confirm("Are you sure you want to delete this?");
    try {
      if (useInput) {
        await deleteCar(id);
        alert("Deleted successfully!");
        fetchData();
      }
    } catch (error) {
      alert(`Failed to be deleted. Error: ${error.message}`);
    }
  };

  return (
    <div className="flex flex-col gap-4 p-5">
      <AdminPageTitle
        text="Cars"
        hasBtn
        btnText="Add Car"
        btnLink="/admin/cars/add"
      />
      {car?.map((item) => {
        return (
          <CarListItem key={car._id} car={item} handleDelete={handleDelete} />
        );
      })}
    </div>
  );
}

export default CarList;
