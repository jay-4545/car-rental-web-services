import React, { useState } from "react";
import NavbarMainAdmin from "./NavbarMainAdmin";
import FooterMainAdmin from "./FooterMainAdmin";
import { Outlet } from "react-router-dom";
import DrawerMainAdmin from "./DrawerMainAdmin";
import { Toolbar } from "@mui/material";

function LayoutMainAdmin() {
  const [open, setOpen] = useState(true);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <>
      <NavbarMainAdmin toggleDrawer={toggleDrawer} />
      <Toolbar />
      <div className="flex">
        <DrawerMainAdmin open={open} />
        <div className="p-8 grow-[1]">
          <Outlet />
        </div>
      </div>
      <FooterMainAdmin />
    </>
  );
}

export default LayoutMainAdmin;
