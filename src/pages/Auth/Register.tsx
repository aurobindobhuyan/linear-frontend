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
  const [formState, setFormState] = useState<registerForm>({
    username: "",
    email: "",
    password: "",
  });

  const updateState = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "email") {
      setFormState({ ...formState, email: e.target.value });
    } else if (e.target.name === "username") {
      setFormState({ ...formState, username: e.target.value });
    } else {
      setFormState({ ...formState, password: e.target.value });
    }
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit({ action: "register", payload: formState });
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <h1>Register</h1>
      <br />
      <div className="form-group">
        <input type="text" onChange={updateState} name="username" />
        <label>username</label>
      </div>
      <div className="form-group">
        <input type="text" onChange={updateState} name="email" />
        <label>Email</label>
      </div>
      <div className="form-group">
        <input type="password" onChange={updateState} name="password" />
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
