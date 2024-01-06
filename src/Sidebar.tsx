import { Link } from "react-router-dom";

interface SidebarProps {
  isLoggedIn: boolean;
  toggleLogin: () => void;
}

const Sidebar = ({ isLoggedIn }: SidebarProps) => {
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
      <div className="logoDiv">
        <Link to="/">Logo</Link>
      </div>
      <section className="userSection">
        <div className="link-heading">USER</div>
        <ul>
          {after_login_liks.map((ele) => (
            <li key={ele.title} className="navLinks">
              <Link to={ele.address}>
                <span>Logo</span>
                <span>{ele.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <section className="adminSection">
        {/* Need to add the admin only links */}
      </section>
    </>
  );
};

export default Sidebar;
