import { useState } from "react";

import { useLoginMutation } from "../../redux/auth/authApiSlice";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
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
        <button type="submit" disabled={isLoading}>Login</button>
      </form>
    </>
  );
};

export default Login;
