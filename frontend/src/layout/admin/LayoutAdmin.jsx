import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import FooterAdmin from "./FooterAdmin";
import NavbarAdmin from "./NavbarAdmin";
import { Toolbar } from "@mui/material";
import DrawerAdmin from "./DrawerAdmin";

function LayoutAdmin() {
  const [open, setOpen] = useState(true);

  const toggleDrawer = () => {
    setOpen(!open);
  };
  return (
    <>
      <NavbarAdmin toggleDrawer={toggleDrawer} />
      <Toolbar />
      <div className="flex">
        <DrawerAdmin open={open} toggleDrawer={toggleDrawer} />
        <div className="p-8 grow-[1]">
          <Outlet />
          {/* <FooterAdmin /> */}
        </div>
      </div>
    </>
  );
}

export default LayoutAdmin;
