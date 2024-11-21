import { grey } from "@mui/material/colors";
import createTheme from "@mui/material/styles/createTheme";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import LayoutAdmin from "./layout/admin/LayoutAdmin";
import LayoutMain from "./layout/main/LayoutMain";
import AddUpdateCarForm from "./pages/admin/Car/AddUpdateCarForm";
import CarList from "./pages/admin/Car/CarList";
import DashBoard from "./pages/admin/DashBoard";
import OrderList from "./pages/admin/orders/OrderList";
import UserList from "./pages/admin/users/UserList";
import Home from "./pages/main/Home";
import ProductDetails from "./pages/main/ProductDetails";
import SignIn from "./pages/main/SignIn";
import SignUp from "./pages/main/SignUp";
import VerifyEmail from "./pages/main/VerifyEmail";
import store from "./redux/store";

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
            </Route>

            <Route path="/admin" element={<LayoutAdmin />}>
              <Route index element={<DashBoard />} />
              <Route path="cars" element={<CarList />} />
              <Route path="cars/:id" element={<AddUpdateCarForm />} />
              <Route path="users" element={<UserList />} />
              <Route path="orders" element={<OrderList />} />
            </Route>
          </Routes>
        </BrowserRouter>
        <ToastContainer />
      </Provider>
    </ThemeProvider>
  );
}

export default App;
