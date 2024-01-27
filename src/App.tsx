import { useEffect } from "react";
import Navbar from "./pages/Layout/Navbar";
import { useSelector, useDispatch } from "react-redux";

import { getToken, setToken, logout } from "./redux/auth/authSlice";
import "./global.css";

const App = () => {
  const token = useSelector(getToken).token;
  const dispatch = useDispatch();

  function getCookie(name: string) {
    const cookies = document.cookie.split("; ");
    const cookie = cookies.find((cookie) => cookie.startsWith(`${name}=`));
    return cookie ? cookie.split("=")[1] : null;
  }

  useEffect(() => {
    if (!token) {
      const accessTokenFromCookie = getCookie("accessToken");
      if (accessTokenFromCookie) dispatch(setToken(accessTokenFromCookie));
    }
  }, []);

  const toggleIsLoggedIn = () => {
    document.cookie =
      "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    dispatch(logout());
  };

  return <Navbar isLoggedIn={Boolean(token)} toggleLogin={toggleIsLoggedIn} />;
};

export default App;
