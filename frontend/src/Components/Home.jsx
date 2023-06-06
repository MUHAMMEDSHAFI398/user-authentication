import React, { useEffect, useState } from "react";
import { authenticateAPI, userDataAPI } from "../Services/userServices";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../Redux/Action/Index";

function Home() {
  const dispatch = useDispatch();
  const { storeuserData } = bindActionCreators(actionCreators, dispatch);

  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    authenticateAPI(token)
      .then((res) => {
        setUserEmail(res.data.user.email);
      })
      .catch((err) => {
        navigate("/error");
      });
  });
  useEffect(() => {
    userDataAPI(userEmail)
      .then((res) => {
        storeuserData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userEmail]);
  const details = useSelector((state) => state.userData);
  console.log(details);

  const handleClick = (e) => {
    e.preventDefault();
    localStorage.removeItem("userToken");
    navigate("/");
  };
  return (
    <div>
      <nav className="bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <a href="/" className="text-white text-xl font-bold">
                Logo
              </a>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <p
                  onClick={() => navigate("/home")}
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer"
                >
                  Home
                </p>
                <p
                  onClick={handleClick}
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer"
                >
                  Logout
                </p>
              </div>
            </div>
            <div className="md:hidden">
              {/* Mobile menu icon */}
              <button
                type="button"
                className="text-gray-300 hover:text-white focus:outline-none focus:text-white"
                onClick={toggleMobileMenu}
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <p
                onClick={() => navigate("/home")}
                className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium cursor-pointer"
              >
                Home
              </p>
              <p
                onClick={handleClick}
                className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium cursor-pointer"
              >
                Logout
              </p>
            </div>
          </div>
        )}
      </nav>
      <div className="flex justify-center ">
        <p className="font-bold text-[50px] mt-5">
          Welcome {details?.userData?.name}
        </p>
      </div>
      <div className="flex justify-center ">
        <p className=" text-[20px] mt-5">Email: {details?.userData?.email}</p>
      </div>
      <div className="flex justify-center">
        <p className=" text-[20px] mt-5">City: {details?.userData?.city}</p>
      </div>
    </div>
  );
}

export default Home;
