import { useEffect, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import { IUser } from "../../../redux/user/userSlice";
import { IconButton } from "@mui/material";

interface UserListProps extends IUser {
  displayAll: boolean;
}

const UserList = ({ displayAll, ...user }: UserListProps) => {
  const [expand, setExpand] = useState(false);

  useEffect(() => {
    if (displayAll) setExpand(true);
    else setExpand(false);
  }, [displayAll]);

  const handleExpand = () => setExpand(!expand);

  return (
    <>
      <tr className="user-table-row">
        <td>{user.username}</td>
        <td>{user.email}</td>
        <td>
          <IconButton
            className={`icon ${expand ? "open" : ""}`}
            onClick={handleExpand}
          >
            <KeyboardArrowDownIcon />
          </IconButton>
        </td>
        <td>{user.roles}</td>
        <td>{user.isActive ? "Yes" : "No"}</td>
        <td>{new Date(user.createdAt).toLocaleDateString()}</td>
      </tr>

      {expand && (
        <tr className={`user_row ${expand ? "opened" : ""}`}>
          <td colSpan={6}>Id: {user._id}</td>
        </tr>
      )}
    </>
  );
};

export default UserList;
