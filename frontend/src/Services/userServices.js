import axios from "../axios";

export const registrationAPI = (data) => {
  return axios.post("/register", data);
};

export const loginAPI = (data) => {
  return axios.post("/login", data);
};

export const googleLoginAPI = (data) => {
  return axios.post("/googleLogin", data);
};

export const fileProcessAPI = (data) => {
  const token = localStorage.getItem("userToken");
  return axios.post("/file-process", data, {
    "Content-Type": "multipart/form-data",
    headers: { Authorization: token },
  });
};

export const authenticateAPI = (token) => {
  return axios.get("/protected", { headers: { Authorization: token } });
};

export const userDataAPI = (data) => {
  const token = localStorage.getItem("userToken");
  return axios.get(`/user-data/${data}`, { headers: { Authorization: token } });
};
