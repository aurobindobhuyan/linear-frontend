import { lazy, Suspense } from "react";
import { Link, Route, Routes, Navigate } from "react-router-dom";

// MUI Imports
import { Button } from "@mui/material";

// Components or Pages
const Header = lazy(() => import("./Header"));
const Public = lazy(() => import("./pages/Before_login/Public"));
const Login = lazy(() => import("./pages/Before_login/Login"));
const Register = lazy(() => import("./pages/Before_login/Register"));
const Dashboard = lazy(() => import("./pages/After_login/Dashboard"));
const Notes = lazy(() => import("./pages/After_login/Notes"));
const User = lazy(() => import("./pages/After_login/User"));

interface NavbarProps {
  isLoggedIn: boolean;
  toggleLogin: () => void;
}

const Navbar = ({ isLoggedIn, toggleLogin }: NavbarProps) => {
  return (
    <>
      <div className="container">
        <div id="header">
          <Header isLoggedIn={isLoggedIn} toggleLogin={toggleLogin} />
        </div>
        <div id="side_bar"></div>
        <div id="content">
          <Suspense fallback={<h1>Loading....</h1>}>
            <Routes>
              {isLoggedIn ? (
                <>
                  <Route path="/" element={<Public />} />
                  <Route path="login" element={<Login />} />
                  <Route path="register" element={<Register />} />
                </>
              ) : (
                <>
                  <Route path="/" element={<Dashboard />} />

                  <Route path="notes">
                    <Route index element={<Notes />} />
                    <Route path="/notes/:id" element={<h1>Note's Id</h1>} />
                  </Route>

                  <Route path="users">
                    <Route index element={<User />} />
                    <Route path="/users/:id" element={<h1>User's Id</h1>} />
                  </Route>

                  {/* If anyone tries to change the URL manually, so redirect them to home */}
                  {/* <Route path="login" element={<Navigate to="/" replace />} />
                  <Route
                    path="register"
                    element={<Navigate to="/" replace />}
                  /> */}
                </>
              )}
              <Route
                path="*"
                element={
                  <>
                    <h1>404 Route not found</h1>
                    <Button>
                      <Link className="nav-link" to="/">
                        Go Home
                      </Link>
                    </Button>
                  </>
                }
              />
            </Routes>
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default Navbar;
