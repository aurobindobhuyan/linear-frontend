import { useEffect } from "react";
import Navbar from "./pages/Layout/Navbar";
import { useSelector, useDispatch } from "react-redux";

import { getToken, setToken, logout } from "./redux/auth/authSlice";
import "./global.css";

const App = () => {
  const token = useSelector(getToken).token;
  const dispatch = useDispatch();

  useEffect(() => {
    if (!token) {
      const accessTokenFromCookie = localStorage.getItem("accessToken");
      if (accessTokenFromCookie) dispatch(setToken(accessTokenFromCookie));
    }
  }, []);

  const toggleIsLoggedIn = () => {
    dispatch(logout());
  };

  return <Navbar isLoggedIn={Boolean(token)} toggleLogin={toggleIsLoggedIn} />;
};

export default App;
