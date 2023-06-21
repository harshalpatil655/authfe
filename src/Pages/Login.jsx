import React, { useEffect, useState } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import jwtDecode from "jwt-decode";
import axios from "axios";

const Login = () => {
  const [data, setData] = useState([]);

  const adduser = (data) => {
    axios
      .post("http://localhost:7001/api/adduser", data)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const handleLoginSuccess = async (response) => {
    console.log("Google Sign-In successful:", response);

    const details = jwtDecode(response.credential);
    console.log(details);
    adduser(details);
  };

  const handleLoginFailure = (response) => {
    console.log("Google Sign-In failed:", response);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    adduser(data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData({ ...data, [name]: value });
  };

  const googleAuthbutton = () => {
    return (
      <div>
        <GoogleOAuthProvider clientId="975252585333-gnfdfqob41itrqkjqjct69qnaaokhdtc.apps.googleusercontent.com">
          <GoogleLogin
            onSuccess={handleLoginSuccess}
            onError={handleLoginFailure}
          />
        </GoogleOAuthProvider>
      </div>
    );
  };

  return (
    <div className="container ">
      <div className="row justify-content-center">
        <div className="col-md-6 border m-4 p-4 rounded">
          <h1>Login</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name:
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Harshal Patil"
                name="name"
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email:
              </label>
              <input
                type="email"
                className="form-control"
                placeholder="harshal@gmail.com"
                name="email"
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Submit
            </button>
            <div className="d-flex justify-content-center my-4 w-100 border rounded p-2">
              <p className="mx-2 align-center">Login in using google</p>
              {googleAuthbutton()}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
