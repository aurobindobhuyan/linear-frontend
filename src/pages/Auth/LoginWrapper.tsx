import { useState } from "react";
import { useLoginMutation } from "../../redux/auth/authApiSlice";

import Register, { registerForm } from "./Register";
import Login, { loginForm } from "./Login";

import image from "../../../public/computer-security-with-login-password-padlock_107791-16191.avif";

import "./wrapper.css";

type FormPayload =
  | {
      action: "login";
      payload: loginForm;
    }
  | {
      action: "register";
      payload: registerForm;
    };

const LoginWrapper = () => {
  const [signin, setSignin] = useState(false);
  const [login, { isLoading: loginLoading, error: loginError }] =
    useLoginMutation();

  const toggleLogin = () => setSignin(!signin);

  const handleSubmit = async (data: FormPayload) => {
    // if (data.action === "login") {
    //   try {
    //     await login(data.payload);
    //   } catch (error) {
    //     console.log("error in login", error);
    //   }
    // }
    console.log("data", data);
  };

  return (
    <div className="body_wrapper">
      <div className="wrapper_container">
        <div className="wrapper_image">
          <img src={image} alt="login" />
        </div>
        <hr />
        <div className={`wrapper_forms ${signin ? "signin" : "login"}`}>
          <div className="login_container signup">
            <Login
              handleSubmit={handleSubmit}
              loading={loginLoading}
              error={loginError}
              toggleLogin={toggleLogin}
            />
          </div>
          <div className="login_container register">
            <Register handleSubmit={handleSubmit} toggleLogin={toggleLogin} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginWrapper;
