import { grey } from "@mui/material/colors";
import createTheme from "@mui/material/styles/createTheme";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LayoutAdmin from "./layout/admin/LayoutAdmin";
import LayoutMain from "./layout/main/LayoutMain";
import LayoutMainAdmin from "./layout/mainAdmin/LayoutMainAdmin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AddUpdateCarForm from "./pages/admin/Car/AddUpdateCarForm";
import CarList from "./pages/admin/Car/CarList";
import OrderList from "./pages/admin/orders/OrderList";
import Home from "./pages/main/Home";
import ProductDetails from "./pages/main/ProductDetails";
import SignIn from "./pages/main/SignIn";
import SignUp from "./pages/main/SignUp";
import VerifyEmail from "./pages/main/VerifyEmail";
import Dashboard from "./pages/mainAdmin/Dashboard";
import store from "./redux/store";
import UserList from "./pages/mainAdmin/users/UserList";
import AdminList from "./pages/mainAdmin/admins/AdminList";
import ConfirmBooking from "./pages/main/ConfirmBooking";
import MyProfile from "./pages/main/MyProfile";

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: grey[900],
      },
      secondary: {
        main: grey[800],
      },
      text: {
        main: grey[700],
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LayoutMain />}>
              <Route index element={<Home />} />
              <Route path="cardetails/:slug" element={<ProductDetails />} />
              <Route path="signup" element={<SignUp />} />
              <Route path="signin" element={<SignIn />} />
              <Route path="verifyEmail" element={<VerifyEmail />} />
              <Route path="confirmBooking" element={<ConfirmBooking />} />
              <Route path="myProfile" element={<MyProfile />} />
            </Route>

            <Route path="/admin" element={<LayoutAdmin />}>
              <Route index element={<AdminDashboard />} />
              <Route path="cars" element={<CarList />} />
              <Route path="cars/:id" element={<AddUpdateCarForm />} />
              <Route path="orders" element={<OrderList />} />
            </Route>

            <Route path="/mainAdmin" element={<LayoutMainAdmin />}>
              <Route index element={<Dashboard />} />
              <Route path="users" element={<UserList />} />
              <Route path="admins" element={<AdminList />} />
            </Route>
          </Routes>
        </BrowserRouter>
        <ToastContainer />
      </Provider>
    </ThemeProvider>
  );
}

export default App;
