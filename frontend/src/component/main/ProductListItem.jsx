import React, { useEffect, useState } from "react";
import ProductList from "./ProductList";
import { getAllCars } from "../../services/apiServices";

function ProductListItem() {
  const [car, setCar] = useState(null);

  useEffect(() => {
    getAllCars().then((data) => {
      setCar(data.data);
    });
  }, []);

  return (
    <div className="grid grid-cols-4 items-center justify-evenly gap-4 p-8">
      {car?.map((item) => {
        return <ProductList item={item} />;
      })}
    </div>
  );
}

export default ProductListItem;
