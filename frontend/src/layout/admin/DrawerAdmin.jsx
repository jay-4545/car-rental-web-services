import DashboardIcon from "@mui/icons-material/Dashboard";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import GroupIcon from "@mui/icons-material/Group";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { styled, useTheme } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import * as React from "react";
import { NavLink } from "react-router-dom";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  overflowX: "hidden",
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop,
})(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  variants: [
    {
      props: ({ open }) => open,
      style: {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
      },
    },
    {
      props: ({ open }) => !open,
      style: {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
      },
    },
  ],
}));

const links = [
  { icon: <DashboardIcon />, text: "Dashboard", to: "/admin" },
  { icon: <DirectionsCarIcon />, text: "Cars", to: "/admin/cars" },
  { icon: <GroupIcon />, text: "Users", to: "/admin/users" },
  { icon: <ReceiptLongIcon />, text: "Orders", to: "/admin/orders" },
];
const extraLinks = [
  {
    icon: <PowerSettingsNewIcon />,
    text: "Logout",
    to: "",
  },
];

function DrawerAdmin({ open }) {
  const theme = useTheme();
  return (
    <>
      <Drawer variant="permanent" open={open}>
        <Toolbar />
        <Box>
          <List>
            {links.map((link, index) => (
              <ListItem
                component={NavLink}
                end
                to={link.to}
                key={index}
                disablePadding
                style={({ isActive }) => {
                  return isActive
                    ? {
                        color: theme.palette.primary.main,
                      }
                    : {};
                }}
              >
                <ListItemButton>
                  <ListItemIcon style={{ color: "inherit" }}>
                    {link.icon}
                  </ListItemIcon>
                  <ListItemText primary={link.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {extraLinks.map((link, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton>
                  <ListItemIcon>{link.icon}</ListItemIcon>
                  <ListItemText primary={link.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
}

export default DrawerAdmin;
