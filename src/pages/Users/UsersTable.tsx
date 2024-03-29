import { useState } from "react";
import { useSelector } from "react-redux";
import { useGetUserQuery, selectAllUsers } from "../../redux/user/userSlice";

import { IconButton, Tooltip } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import UserList from "./UsersTableRow";
import "./user.css";
import TableHeader from "../../components/TableHeader";

const UserTable = () => {
  const [seeAll, setSeeAll] = useState(false);
  const { isLoading, error } = useGetUserQuery({});
  const allUsers = useSelector(selectAllUsers);

  if (error || error?.data?.message) {
    throw new Error(error.data.message);
  }

  const handleSeeAll = () => setSeeAll(!seeAll);

  return (
    <div>
      <div>
        {isLoading ? (
          <h2>Loading.....</h2>
        ) : allUsers.length === 0 ? (
          <h2>No users found</h2>
        ) : (
          <div className="user-table-container">
            <TableHeader title="User" handleInput={(e) => {}} />
            <table className="user-table">
              <thead>
                <tr className="user-table-row">
                  <th>Name</th>
                  <th>Email</th>
                  <th>
                    <Tooltip
                      title={seeAll ? "Hide" : "Show"}
                      arrow
                      describeChild
                    >
                      <IconButton color="inherit" onClick={handleSeeAll}>
                        {seeAll ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </IconButton>
                    </Tooltip>
                  </th>
                  <th>Role</th>
                  <th>Active</th>
                  <th>Created At</th>
                </tr>
              </thead>
              <tbody>
                {allUsers.map((user) => {
                  return (
                    <UserList key={user._id} displayAll={seeAll} {...user} />
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserTable;
