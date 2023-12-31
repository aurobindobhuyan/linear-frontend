import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

interface HeaderProps {
  isLoggedIn: boolean;
  toggleLogin: () => void;
}

export default function Header({ isLoggedIn, toggleLogin }: HeaderProps) {
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
    <>
      <div>
        {isLoggedIn
          ? before_login_liks.map((ele) => (
              <Link key={ele.title} to={ele.address}>
                {ele.title}
              </Link>
            ))
          : after_login_liks.map((ele) => (
              <Link key={ele.title} to={ele.address}>
                {ele.title}
              </Link>
            ))}
      </div>
      <Button variant="contained" color="error" onClick={toggleLogin}>
        {isLoggedIn ? "Login" : "Logout"}
      </Button>
    </>
  );
}
