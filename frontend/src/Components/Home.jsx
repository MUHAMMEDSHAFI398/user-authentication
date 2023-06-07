import React, { useEffect, useState } from "react";
import { authenticateAPI, userDataAPI } from "../Services/userServices";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../Redux/Action/Index";
import NavBar from "./NavBar";

function Home() {
  const dispatch = useDispatch();
  const { storeuserData } = bindActionCreators(actionCreators, dispatch);

  const [userEmail, setUserEmail] = useState("");
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

  return (
    <div>
      <NavBar />
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
