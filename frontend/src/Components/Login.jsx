import React, { useState, useRef, useEffect } from "react";
import "../style.css";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import validate from "../Validation/LoginValidation";
import { googleLoginAPI, loginAPI } from "../Services/userServices";
import { message } from "antd";

function Login() {
  const navigate = useNavigate();
  const signBtn = useRef(null);

  const [error, setErrors] = useState({});
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    /* global google */
    const handleGoogle = async (response) => {
      const token = response.credential;
      const userObj = jwt_decode(token);
      googleLoginAPI(userObj)
        .then((response) => {
          if (response.data.status) {
            const jwtToken = response.data.token;
            localStorage.setItem("userToken", jwtToken);
            message.success("Successfully logged in");
            navigate("/home");
          } else {
            navigate("/error");
          }
        })
        .catch((err) => {
          navigate("/error");
        });
    };
    if (window.google) {
      google.accounts.id.initialize({
        client_id:
          "954798413475-4bmf52ppi7v67jqosm79370sv10ssgnl.apps.googleusercontent.com",
        callback: handleGoogle,
      });

      google.accounts.id.renderButton(signBtn.current, {
        type: "standard",
        theme: "standard",
        size: "large",
        text: "signUp_with",
        shape: "pill",
      });
    }
  }, [navigate]);

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate(formValues);
    if (Object.keys(errors).length !== 0) {
      setErrors(errors);
    } else {
      loginAPI(formValues)
        .then((response) => {
          if (response.data.status) {
            const jwtToken = response.data.token;
            localStorage.setItem("userToken", jwtToken);
            message.success("Successfully logged in");
            navigate("/home");
          } else {
            navigate("/error");
          }
        })
        .catch((err) => {
          navigate("/error");
        });
    }
  };
  return (
    <div className="flex justify-center">
      <div className="border-2 border-black w-[334px] flex justify-center mt-[60px]">
        <div>
          <div className="flex justify-center underline">
            <p className="text-[25px] mb-[40px]">Login to your account</p>
          </div>
          <div className="mb-6">
            <label
              for="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your email
            </label>
            <input
              onChange={handleChange}
              value={formValues.email}
              type="email"
              id="email"
              name="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[300px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
            {error.email && <p className="ms-2 text-red-500">{error.email}</p>}
          </div>
          <div className="mb-6">
            <label
              for="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your password
            </label>
            <input
              onChange={handleChange}
              value={formValues.password}
              type="password"
              id="password"
              name="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[300px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
            {error.password && (
              <p className="ms-2 text-red-500">{error.password}</p>
            )}
          </div>
          <div className="flex justify-center mb-3">
            <button
              type="submit"
              onClick={handleSubmit}
              className="text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-[300px] sm:w-auto px-5 py-2.5  text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 "
            >
              Submit
            </button>
          </div>
          <div className="flex justify-center mb-3">
            <p>or</p>
          </div>
          <div className="flex justify-center mb-3">
            <button ref={signBtn}></button>
          </div>
          <div className="flex justify-center mt-3">
            <p className=" mb-[40px]">Dont have an account?</p>
            <p
              onClick={() => navigate("/register")}
              className="text-blue-500 cursor-pointer"
            >
              Register
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
