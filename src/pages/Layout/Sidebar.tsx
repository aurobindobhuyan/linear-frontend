import { NavLink } from "react-router-dom";

import HomeIcon from "@mui/icons-material/Home";
import NotesIcon from "@mui/icons-material/Notes";
import GroupIcon from "@mui/icons-material/Group";

interface SidebarProps {
  isLoggedIn: boolean;
  toggleLogin: () => void;
  hovered: boolean;
}

const Sidebar = ({ hovered }: SidebarProps) => {
  const after_login_liks = [
    {
      address: "/",
      title: "Home",
      icon: <HomeIcon sx={{ color: "white" }} fontSize="medium" />,
    },
    {
      address: "notes",
      title: "Notes",
      icon: <NotesIcon sx={{ color: "white" }} fontSize="medium" />,
    },
    {
      address: "users",
      title: "Users",
      icon: <GroupIcon sx={{ color: "white" }} fontSize="medium" />,
    },
  ];

  return (
    <>
      <div className="logoDiv">
        <NavLink to="/">Logo</NavLink>
      </div>
      <section className="userSection">
        <div className="link-heading">USER</div>
        <ul>
          {after_login_liks.map((ele) => (
            <li key={ele.title} className="navLinks">
              <NavLink
                to={ele.address}
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "active" : ""
                }
              >
                <span>{ele.icon}</span>
                {hovered && <span>{ele.title}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </section>
      <section className="userSection">
        <div className="link-heading">ADMIN</div>
        {/* Need to add the admin only links */}
        <ul>
          {after_login_liks.map((ele) => (
            <li key={ele.title} className="navLinks">
              <NavLink
                to={ele.address}
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "active" : ""
                }
              >
                <span>{ele.icon}</span>
                {hovered && <span>{ele.title}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};

export default Sidebar;
