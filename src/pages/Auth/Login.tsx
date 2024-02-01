import { useState } from "react";

import "./login.css";

export type loginForm = {
  email: string;
  password: string;
};

interface LoginProps {
  toggleLogin: () => void;
  loading: boolean;
  error: any;
  handleSubmit: (data: { action: "login"; payload: loginForm }) => void;
}

const Login = ({ toggleLogin, handleSubmit }: LoginProps) => {
  const [formState, setFormState] = useState<loginForm>({
    email: "",
    password: "",
  });

  const updateState = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "email") {
      setFormState({ ...formState, email: e.target.value });
    } else {
      setFormState({ ...formState, password: e.target.value });
    }
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit({ action: "login", payload: formState });
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <h1>Login</h1>
      <br />
      <div className="form-group">
        <input type="text" onChange={updateState} name="email" />
        <label>Email</label>
      </div>
      <div className="form-group">
        <input type="password" onChange={updateState} name="password" />
        <label>Password</label>
      </div>

      <button type="submit" className="btn">
        Save
      </button>
      <br />
      <p>
        Don't have an account? <span onClick={toggleLogin}>Register</span>
      </p>
    </form>
  );
};

export default Login;
