import { useSelector } from "react-redux";
import {
  useGetUserQuery,
  selectAllUsers,
} from "../../redux/user/userSlice";

const User = () => {
  useGetUserQuery({});
  const allUsers = useSelector(selectAllUsers);

  return (
    <div>
      <h1>All Users Page</h1>
      <div>
        {allUsers.map((user) => {
          return <p key={user._id}>{user.username}</p>;
        })}
      </div>
    </div>
  );
};

export default User;
