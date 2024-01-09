import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

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
        <ul style={{ display: "flex" }}>
          {isLoggedIn
            ? before_login_liks.map((ele) => (
                <li className="navLinks" key={ele.title}>
                  <Link to={ele.address}>{ele.title}</Link>
                </li>
              ))
            : after_login_liks.map((ele) => (
                <li className="navLinks" key={ele.title}>
                  <Link className="navLinks" key={ele.title} to={ele.address}>
                    {ele.title}
                  </Link>
                </li>
              ))}
        </ul>
      </div>
      <Button variant="contained" color="error" onClick={toggleLogin}>
        {isLoggedIn ? "Login" : "Logout"}
      </Button>
    </>
  );
}
