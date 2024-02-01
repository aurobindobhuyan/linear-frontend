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
const LoginWrapper = lazy(() => import("../Auth/LoginWrapper"));
const Dashboard = lazy(() => import("./Dashboard"));
const UsersTable = lazy(() => import("../Users/UsersTable"));
const NotesTable = lazy(() => import("../Notes/NotesTable"));
const NoteId = lazy(() => import("../Notes/NoteId"));

interface NavbarProps {
  isLoggedIn: boolean;
  toggleLogin: () => void;
}

const Navbar = ({ isLoggedIn, toggleLogin }: NavbarProps) => {
  const [isSidebarHovered, setIsSidebarHovered] = useState(false);

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
          <Header isLoggedIn={isLoggedIn} />
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
        <div id="content">
          <ErrorBoundary>
            <Suspense fallback={<h1>Loading....</h1>}>
              <Routes>
                {!isLoggedIn ? (
                  <>
                    <Route path="/" element={<Public />} />
                    <Route path="login" element={<LoginWrapper />} />
                  </>
                ) : (
                  <>
                    <Route path="/" element={<Dashboard />} />

                    <Route path="notes">
                      <Route index element={<NotesTable />} />
                      <Route path="/notes/:id" element={<NoteId />} />
                    </Route>

                    <Route path="users">
                      <Route index element={<UsersTable />} />
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
          </ErrorBoundary>
        </div>
      </div>
    </>
  );
};

export default Navbar;
