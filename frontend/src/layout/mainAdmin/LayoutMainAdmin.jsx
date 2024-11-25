import React from "react";
import NavbarMainAdmin from "./NavbarMainAdmin";
import FooterMainAdmin from "./FooterMainAdmin";
import { Outlet } from "react-router-dom";

function LayoutMainAdmin() {
  return (
    <div>
      <NavbarMainAdmin />
      <Outlet />
      <FooterMainAdmin />
    </div>
  );
}

export default LayoutMainAdmin;
