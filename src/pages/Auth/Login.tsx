import { useState } from "react";

import { useLoginMutation } from "../../redux/auth/authApiSlice";
import "./login.css";

const Login = () => {
  const [signin, setSignin] = useState(false);
  const [form, setForm] = useState({
    email: "aurobindo@gmail.com",
    password: "ffffff",
  });
  const [login, { isLoading }] = useLoginMutation();

  const handleForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "email") {
      setForm({ ...form, email: e.target.value });
    } else if (e.target.name === "password") {
      setForm({ ...form, password: e.target.value });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await login(form);
    } catch (error) {
      console.log("error in login", error);
    }
  };

  const handleToggle = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setSignin(!signin);
  };

  return (
    <>
      <h1>Login Screen</h1>
      {isLoading && <h2>Loading...</h2>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleForm}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleForm}
        />
        <button type="submit" disabled={isLoading}>
          Login
        </button>
      </form>

      <div className="body_div">
        <div className={`wrapper ${signin ? "login" : "signin"}`}>
          <div className="form-container sign-up">
            <form>
              <h2>Register</h2>
              <div className="form-group">
                <input type="text" id="username" />
                <label htmlFor="username">Username</label>
              </div>
              <div className="form-group">
                <input type="text" id="email" />
                <label htmlFor="email">Email</label>
              </div>
              <div className="form-group">
                <input type="text" id="password" />
                <label htmlFor="password">Password</label>
              </div>

              <button onClick={handleToggle} className="btn">
                Register
              </button>

              <span className="link">Don't have an account?</span>
            </form>
          </div>
          <div className="form-container sign-in">
            <form>
              <h2>Login</h2>
              <div className="form-group">
                <input type="text" id="email" />
                <label htmlFor="email">Email</label>
              </div>
              <div className="form-group">
                <input type="text" id="password" />
                <label htmlFor="password">Password</label>
              </div>

              <button onClick={handleToggle} className="btn">
                Login
              </button>

              <span className="link">Don't have an account?</span>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
