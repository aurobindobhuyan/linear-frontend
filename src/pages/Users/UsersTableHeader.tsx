const UserTableHeader = () => {
  return (
    <div className="user-header">
      <h1>Users</h1>
      <div className="user-header">
        <input type="text" placeholder="Search User" />
        <button>Add User</button>
      </div>
    </div>
  );
};

export default UserTableHeader;
