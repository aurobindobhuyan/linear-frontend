import { useState } from "react";
import {
  useLoginMutation,
  useRegisterMutation,
} from "../../redux/auth/authApiSlice";

import Register, { registerForm } from "./Register";
import Login, { loginForm } from "./Login";

// import { useSnackBar } from "../../utils/snack/SnackBar";

import { IUser } from "../../redux/user/userSlice";
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

type IResponse = {
  status: "success" | "failed";
  data: IUser;
};

const LoginWrapper = () => {
  const [signin, setSignin] = useState(false);
  const [login, { isLoading: loginLoading, error: loginError }] =
    useLoginMutation();

  // const { addItem } = useSnackBar();

  const toggleLogin = () => setSignin(!signin);

  const [register, { isLoading }] = useRegisterMutation();

  const handleSubmit = async (data: FormPayload) => {
    if (data.action === "login") {
      try {
        await login(data.payload);
      } catch (error) {
        console.log("error in login", error);
      }
    }

    if (data.action === "register") {
      try {
        const response: { data: IResponse } | { error: any } = await register(
          data.payload
        );

        if ("data" in response) {
          const responseData = response.data;
          if (responseData.status === "success") {
            window.alert("User created successfully");
            toggleLogin();
          }
        }
      } catch (error) {
        console.log("error in register", error);
      }
    }
  };

  return (
    <div className="body_wrapper">
      <div className="wrapper_container">
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
      {/* <button onClick={(e) => addItem("value")}>Click</button> */}
    </div>
  );
};

export default LoginWrapper;
