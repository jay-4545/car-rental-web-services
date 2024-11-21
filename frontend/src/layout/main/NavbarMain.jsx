// import BarChartIcon from "@mui/icons-material/BarChart";
// import CarRentalIcon from "@mui/icons-material/CarRental";
// import DashboardIcon from "@mui/icons-material/Dashboard";
// import DescriptionIcon from "@mui/icons-material/Description";
// import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
// import LayersIcon from "@mui/icons-material/Layers";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import { Typography } from "@mui/material";
// import Box from "@mui/material/Box";
// import { AppProvider } from "@toolpad/core/AppProvider";
// import { DashboardLayout } from "@toolpad/core/DashboardLayout";
// import React, { useMemo, useState } from "react";

// const navigation = [
//   {
//     kind: "header",
//     title: "Main items",
//   },
//   {
//     segment: "dashboard",
//     title: "Dashboard",
//     link: "/admin/dashboard",
//     icon: <DashboardIcon />,
//   },
//   {
//     segment: "cars",
//     title: "Cars",
//     link: "/admin/cars",
//     icon: <DirectionsCarIcon />,
//   },
//   {
//     segment: "orders",
//     title: "Orders",
//     link: "/admin/orders",
//     icon: <ShoppingCartIcon />,
//   },
//   {
//     kind: "divider",
//   },
//   {
//     kind: "header",
//     title: "Analytics",
//   },
//   {
//     segment: "reports",
//     title: "Reports",

//     icon: <BarChartIcon />,
//     children: [
//       {
//         segment: "sales",
//         title: "Sales",
//         link: "/admin/sales",
//         icon: <DescriptionIcon />,
//       },
//     ],
//   },
//   {
//     segment: "integrations",
//     title: "Integrations",
//     link: "/admin/integrations",
//     icon: <LayersIcon />,
//   },
// ];

// function DemoPageContent({ pathname }) {
//   return (
//     <Box
//       sx={{
//         py: 4,
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         textAlign: "center",
//       }}
//     >
//       <Typography>{pathname}</Typography>
//     </Box>
//   );
// }

// function useDemoRouter(initialPath) {
//   const [pathname, setPathname] = React.useState(initialPath);

//   const router = React.useMemo(() => {
//     return {
//       pathname,
//       searchParams: new URLSearchParams(),
//       navigate: (path) => setPathname(String(path)),
//     };
//   }, [pathname]);

//   return router;
// }

// function NavbarMain() {
//   const [session, setSession] = useState({
//     user: {
//       name: "Bharat Kashyap",
//       email: "bharatkashyap@outlook.com",
//       image: "https://avatars.githubusercontent.com/u/19550456",
//     },
//   });

//   const authentication = useMemo(() => {
//     return {
//       signIn: () => {
//         setSession({
//           user: {
//             name: "Bharat Kashyap",
//             email: "bharatkashyap@outlook.com",
//             image: "https://avatars.githubusercontent.com/u/19550456",
//           },
//         });
//       },
//       signOut: () => {
//         setSession(null);
//       },
//     };
//   }, []);

//   const router = useDemoRouter("/dashboard");

//   return (
//     <div className="overflow-hidden flex flex-col items-center">
//       <AppProvider
//         branding={{
//           logo: <CarRentalIcon />,
//           title: "RentalWeb",
//         }}
//         session={session}
//         authentication={authentication}
//         navigation={navigation}
//         router={router}
//       >
//         <DashboardLayout>
//           <DemoPageContent pathname={router.pathname} />
//         </DashboardLayout>
//       </AppProvider>
//     </div>
//   );
// }

// export default NavbarMain;

import AccountCircle from "@mui/icons-material/AccountCircle";
import MoreIcon from "@mui/icons-material/MoreVert";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { AppBar } from "@mui/material";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function NavbarMain() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const navigate = useNavigate();

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const goToHomePage = () => {
    navigate("/");
  };

  const menuId = "primary-search-account-menu";

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem
        onClick={() => {
          handleMenuClose();
          navigate("/admin");
        }}
      >
        Dashboard
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>Log-out</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
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
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <ShoppingBagIcon />
          </Badge>
        </IconButton>
        <p>Cart</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

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

          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
            >
              <Badge badgeContent={4} color="error">
                <ShoppingBagIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}

export default NavbarMain;
