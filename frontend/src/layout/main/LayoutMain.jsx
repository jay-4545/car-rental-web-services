import React from "react";
import NavbarMain from "./NavbarMain";
import { Outlet } from "react-router-dom";
import FooterMain from "./FooterMain";

function LayoutMain() {
  return (
    <div>
      <NavbarMain />
      <Outlet />
      <FooterMain />
    </div>
  );
}

export default LayoutMain;
