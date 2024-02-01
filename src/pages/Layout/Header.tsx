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
            ? after_login_liks.map((ele) => (
                <li className="navLinks" key={ele.title}>
                  <Link to={ele.address}>{ele.title}</Link>
                </li>
              ))
            : before_login_liks.map((ele) => (
                <li className="navLinks" key={ele.title}>
                  <Link className="navLinks" key={ele.title} to={ele.address}>
                    {ele.title}
                  </Link>
                </li>
              ))}
        </ul>
      </div>
    </>
  );
}
