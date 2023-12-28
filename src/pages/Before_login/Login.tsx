import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div>
      <h1>Login Screen</h1>
      <Link to="/">Go Home</Link>
      <button>
        <Link to="/register">Register</Link>
      </button>
    </div>
  );
};

export default Login;
