import { unSetUser } from "../redux/slice/userSlice";
import { logOut } from "../services/apiServices";

export const handleLogout = async (dispatch) => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  dispatch(unSetUser());
  await logOut();
};

export const clearToken = async (dispatch) => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  dispatch(unSetUser());
};
