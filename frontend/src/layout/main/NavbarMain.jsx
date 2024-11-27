import MoreIcon from "@mui/icons-material/MoreVert";
import { AppBar } from "@mui/material";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Extras from "./navbar/Extras";
import MobileMenu from "./navbar/MobileMenu";
import ProfileMenu from "./navbar/ProfileMenu";

function NavbarMain({ toggleCart }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const navigate = useNavigate();

  const user = useSelector((store) => {
    return store.user.user;
  });

  const openProfileMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMobileMenu = () => {
    setMobileMoreAnchorEl(null);
  };

  const openMobileMenu = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const goToHomePage = () => {
    navigate("/");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h1"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
            fontSize="1.5rem"
            onClick={goToHomePage}
            className="cursor-pointer"
          >
            RentalWeb
          </Typography>

          <Box sx={{ flexGrow: 1 }} />

          <Extras
            toggleCart={toggleCart}
            openProfileMenu={openProfileMenu}
            user={user}
          />

          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton size="large" onClick={openMobileMenu} color="inherit">
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <MobileMenu
        mobileMoreAnchorEl={mobileMoreAnchorEl}
        closeMobileMenu={closeMobileMenu}
        openProfileMenu={openProfileMenu}
        user={user}
      />

      {user && (
        <ProfileMenu
          anchorEl={anchorEl}
          setAnchorEl={setAnchorEl}
          closeMobileMenu={closeMobileMenu}
          user={user}
        />
      )}
    </Box>
  );
}

export default NavbarMain;
