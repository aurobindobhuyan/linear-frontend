import { Link } from "react-router-dom";
import Notes from "./Notes";

const Dashboard = () => {
  return (
    <div>
      <h1>This should visible after login</h1>
      <Link to="/notes">
        <Notes />
      </Link>
      <Link to="/users">
        <Notes />
      </Link>
    </div>
  );
};

export default Dashboard;
