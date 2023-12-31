import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

interface HeaderProps {
  isLoggedIn: boolean;
}

export default function Header({ isLoggedIn }: HeaderProps) {
  const before_login_liks = [
    {
      address: "/",
      title: "Home",
    },
    {
      address: "login",
      title: "Login",
    },
    {
      address: "register",
      title: "Register",
    },
  ];
  const after_login_liks = [
    {
      address: "/",
      title: "Home",
    },
    {
      address: "notes",
      title: "Notes",
    },
    {
      address: "users",
      title: "Users",
    },
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Box sx={{ display: "flex", alignItems: "center", maxWidth: "30%" }}>
          {isLoggedIn
            ? before_login_liks.map((ele) => (
                <Button sx={{ ml: 3, mr: 3, p: 0 }} key={ele.title}>
                  <Link className="nav-link" to={ele.address}>
                    {ele.title}
                  </Link>
                </Button>
              ))
            : after_login_liks.map((ele) => (
                <Button sx={{ ml: 3, mr: 3, p: 0 }} key={ele.title}>
                  <Link className="nav-link" to={ele.address}>
                    {ele.title}
                  </Link>
                </Button>
              ))}
        </Box>
      </AppBar>
    </Box>
  );
}
