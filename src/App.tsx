import { useEffect } from "react";
import Navbar from "./pages/Layout/Navbar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  useLogoutMutation,
  useRefreshTokenMutation,
} from "./redux/auth/authApiSlice";
import { getToken } from "./redux/auth/authSlice";

import { SnackBarProvider } from "./utils/snack/SnackBar";

import "./global.css";

const App = () => {
  const token = useSelector(getToken).token;
  const [logOut] = useLogoutMutation();
  const [refresh] = useRefreshTokenMutation();
  const navigate = useNavigate();

  const makeRequest = async () => {
    try {
      await refresh({});
    } catch (error) {
      console.log("error: ", error);
    }
  };

  useEffect(() => {
    if (!token) {
      const check_localStorage = localStorage.getItem("refreshToken");
      if (check_localStorage) {
        if (new Date() < new Date(check_localStorage)) {
          makeRequest();
        }
      }
    }
  }, []);

  const toggleIsLoggedIn = async () => {
    try {
      await logOut({});
      navigate("/");
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <>
      <SnackBarProvider>
        <Navbar isLoggedIn={Boolean(token)} toggleLogin={toggleIsLoggedIn} />
      </SnackBarProvider>
    </>
  );
};

export default App;
