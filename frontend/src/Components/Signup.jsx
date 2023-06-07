import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registrationAPI } from "../Services/userServices";
import { message } from "antd";
import validate from "../Validation/registerValidation";

function Signup() {
  const navigate = useNavigate();
  const [error, setErrors] = useState({});
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
    city: "",
  });

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    console.log(formValues);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate(formValues);
    if (Object.keys(errors).length !== 0) {
      setErrors(errors);
    } else {
      registrationAPI(formValues)
        .then((response) => {
          if (response.data.status) {
            message.success("Successfully registered");
            navigate("/");
          } else {
            navigate("/error");
          }
        })
        .catch((err) => {
          if (err.response.status === 409) {
            setErrors({ email: "Email already exist" });
          } else {
            navigate("/error");
          }
        });
    }
  };

  return (
    <div className="flex justify-center">
      <div className="border-2 border-black w-[334px] flex justify-center mt-[60px]">
        <form onSubmit={handleSubmit}>
          <div className="flex justify-center underline">
            <p className="text-[25px] mb-[40px]">Register</p>
          </div>
          <div className="mb-6">
            <label
              for="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your name
            </label>
            <input
              onChange={handleChange}
              value={formValues.name}
              type="text"
              id="name"
              name="name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[300px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
            {error.name && <p className="ms-2 text-red-500">{error.name}</p>}
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
          <div className="mb-6">
            <label
              for="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your City
            </label>
            <input
              onChange={handleChange}
              value={formValues.city}
              type="text"
              id="city"
              name="city"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[300px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
            {error.city && <p className="ms-2 text-red-500">{error.city}</p>}
          </div>
          <div className="flex justify-center mb-5">
            <button
              type="submit"
              className="text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-[300px] sm:w-auto px-5 py-2.5  text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 "
            >
              Submit
            </button>
          </div>

          <div className="flex justify-center">
            <p className=" mb-[40px]">Already have an account?</p>
            <p
              onClick={() => navigate("/")}
              className="text-blue-500 cursor-pointer"
            >
              Login
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
