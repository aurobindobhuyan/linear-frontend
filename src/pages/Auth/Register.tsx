import { useState } from "react";

export type registerForm = {
  username: string;
  email: string;
  password: string;
};

interface RegisterProps {
  toggleLogin: () => void;
  // loading: boolean;
  // error: any;
  handleSubmit: (data: { action: "register"; payload: registerForm }) => void;
}

const Register = ({ toggleLogin, handleSubmit }: RegisterProps) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit({
      action: "register",
      payload: { email, username, password },
    });
    setEmail("");
    setUsername("");
    setPassword("");
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <h1>Register</h1>
      <br />
      <div className="form-group">
        <input
          className={`${username ? "hasValue" : ""}`}
          type="text"
          value={username}
          onChange={handleUsername}
          name="username"
        />
        <label>username</label>
      </div>
      <div className="form-group">
        <input
          className={`${email ? "hasValue" : ""}`}
          type="text"
          value={email}
          onChange={handleEmail}
          name="email"
        />
        <label>Email</label>
      </div>
      <div className="form-group">
        <input
          className={`${password ? "hasValue" : ""}`}
          type="password"
          value={password}
          onChange={handlePassword}
          name="password"
        />
        <label>password</label>
      </div>

      <button type="submit" className="btn">
        Save
      </button>
      <p>
        Already have an account? <span onClick={toggleLogin}>Login</span>
      </p>
    </form>
  );
};

export default Register;
