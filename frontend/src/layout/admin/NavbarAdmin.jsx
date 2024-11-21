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
// import LayoutAdmin from "./LayoutAdmin";

// const navigation = [
//   {
//     kind: "header",
//     title: "Main items",
//   },
//   {
//     segment: "dashboard",
//     title: "Dashboard",
//     link: "dashboard",
//     icon: <DashboardIcon />,
//   },
//   {
//     segment: "cars",
//     title: "Cars",
//     link: "cars",
//     icon: <DirectionsCarIcon />,
//   },
//   {
//     segment: "orders",
//     title: "Orders",
//     link: "orders",
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
//         link: "sales",
//         icon: <DescriptionIcon />,
//       },
//     ],
//   },
//   {
//     segment: "integrations",
//     title: "Integrations",
//     link: "integrations",
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
//       <LayoutAdmin />
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

// function NavbarAdmin() {
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

// export default NavbarAdmin;

import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import MoreIcon from "@mui/icons-material/MoreVert";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { CssBaseline } from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { styled } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

function NavbarAdmin({ toggleDrawer }) {
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
      <MenuItem
        onClick={() => {
          handleMenuClose();
          navigate("/");
        }}
      >
        Home
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
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
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
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
    <>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="fixed"
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
              onClick={toggleDrawer}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h1"
              noWrap
              component="div"
              className="cursor-pointer"
              sx={{ display: { xs: "none", sm: "block" } }}
              fontSize="1.5rem"
              onClick={goToHomePage}
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
                  <MailIcon />
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
    </>
  );
}

export default NavbarAdmin;
