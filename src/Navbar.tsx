import { Link, Route, Routes, Navigate } from "react-router-dom";

// MUI Imports
import { Button } from "@mui/material";

// Components or Pages
import Header from "./Header";
import Public from "./pages/Before_login/Public";
import Login from "./pages/Before_login/Login";
import Register from "./pages/Before_login/Register";
import Dashboard from "./pages/After_login/Dashboard";
import Notes from "./pages/After_login/Notes";
import User from "./pages/After_login/User";

interface NavbarProps {
  isLoggedIn: boolean;
  toggleLogin: () => void;
}

const Navbar = ({ isLoggedIn, toggleLogin }: NavbarProps) => {
  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <Button onClick={toggleLogin}>Toggle Login</Button>
      <Routes>
        {isLoggedIn ? (
          <>
            <Route path="/" element={<Public data="Login" />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="register/:id" element={<h1>Id sComponent</h1>} />
          </>
        ) : (
          <>
            <Route path="/" element={<Dashboard />} />
            <Route path="notes" element={<Notes />} />
            <Route path="users" element={<User />} />

            <Route path="login" element={<Navigate to="/" replace />} />
            <Route path="register" element={<Navigate to="/" replace />} />
          </>
        )}
        <Route
          path="*"
          element={
            <>
              <h1>No Routes Found</h1>
              <Button>
                <Link className="nav-link" to="/">Go Home</Link>
              </Button>
            </>
          }
        />
      </Routes>
    </>
  );
};

export default Navbar;
