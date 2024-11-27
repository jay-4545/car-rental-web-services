import React from "react";
import { Badge, Button, IconButton, Menu, MenuItem } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function MobileMenu({
  mobileMoreAnchorEl,
  closeMobileMenu,
  openProfileMenu,
  user,
}) {
  const mobileMenuId = "mobile-menu";
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  return (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={closeMobileMenu}
    >
      <MenuItem>
        <IconButton size="large" color="inherit">
          <Badge badgeContent={4} color="error">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
        <p>Cart</p>
      </MenuItem>

      {user ? (
        <MenuItem onClick={openProfileMenu}>
          <IconButton size="large" color="inherit">
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
      ) : (
        <MenuItem onClick={openProfileMenu}>
          <Button
            LinkComponent={Link}
            to="/signin"
            variant=""
            color="secondary"
          >
            Log In / Sign Up
          </Button>
        </MenuItem>
      )}
    </Menu>
  );
}

export default MobileMenu;
