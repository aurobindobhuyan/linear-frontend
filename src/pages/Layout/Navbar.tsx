import { useState, lazy, Suspense } from "react";
import { Link, Route, Routes, Navigate } from "react-router-dom";
import "./navbar.css";

// MUI Imports
import { Button } from "@mui/material";

// Components or Pages
import ErrorBoundary from "./ErrorBoundary";
import Sidebar from "./Sidebar";
import Header from "./Header";

const Public = lazy(() => import("../Auth/Public"));
const Login = lazy(() => import("../Auth/Login"));
const Register = lazy(() => import("../Auth/Register"));
const Dashboard = lazy(() => import("./Dashboard"));
const User = lazy(() => import("../Users/User"));
const Notes = lazy(() => import("../Notes/Notes"));
const NoteId = lazy(() => import("../Notes/NoteId"));

interface NavbarProps {
  isLoggedIn: boolean;
  toggleLogin: () => void;
}

const Navbar = ({ isLoggedIn, toggleLogin }: NavbarProps) => {
  const [isSidebarHovered, setIsSidebarHovered] = useState(true);

  const handleSidebarEnter = () => setIsSidebarHovered(true);
  const handleSidebarLeave = () => setIsSidebarHovered(false);

  return (
    <>
      <div
        className={`container ${isSidebarHovered ? "sidebar-hovered" : ""} ${
          isLoggedIn ? "" : "remove-sidebar"
        }`}
      >
        <div id="header">
          <Header isLoggedIn={isLoggedIn} toggleLogin={toggleLogin} />
        </div>
        {isLoggedIn && (
          <div
            onMouseEnter={handleSidebarEnter}
            onMouseLeave={handleSidebarLeave}
            id="side_bar"
          >
            <Sidebar
              isLoggedIn={isLoggedIn}
              hovered={isSidebarHovered}
              toggleLogin={toggleLogin}
            />
          </div>
        )}
        <ErrorBoundary>
          <div id="content">
            <Suspense fallback={<h1>Loading....</h1>}>
              <Routes>
                {!isLoggedIn ? (
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
                      <Route path="/notes/:id" element={<NoteId />} />
                    </Route>

                    <Route path="users">
                      <Route index element={<User />} />
                      <Route path="/users/:id" element={<h1>User's Id</h1>} />
                    </Route>

                    {/* If anyone tries to change the URL manually, so redirect them to home */}
                    <Route path="login" element={<Navigate to="/" replace />} />
                    <Route
                      path="register"
                      element={<Navigate to="/" replace />}
                    />
                  </>
                )}
                <Route
                  path="*"
                  element={
                    <>
                      <h1>404 Route not found</h1>
                      <Button variant="contained" color="primary">
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
        </ErrorBoundary>
      </div>
    </>
  );
};

export default Navbar;
