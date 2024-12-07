import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import FooterMain from "./FooterMain";
import NavbarMain from "./NavbarMain";

function LayoutMain() {
  const [isOpen, setIsOpen] = useState(false);

  function toggleCart() {
    setIsOpen(!isOpen);
  }

  return (
    <div>
      <NavbarMain toggleCart={toggleCart} />
      <div>
        <Outlet />
      </div>
      <FooterMain />
    </div>
  );
}

export default LayoutMain;
