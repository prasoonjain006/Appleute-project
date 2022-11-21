import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Auth.css";
import Cookies from "universal-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const cookies = new Cookies();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://appleute-api.herokuapp.com/api/auth/checkauth`, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "x-access-token": cookies.get("token"),
        },
      })
      .then((res) => {
        console.log(res.data);
        navigate("/products");
      })
      .catch((err) => {
        console.log(err);
        cookies.set("token", "");
      });
  }, []);

  function Updatesubmit(e) {
    e.preventDefault();
    if (password === "" || email === "" || confirmPassword === "") {
      alert("Enter all the fields");
    } else if (password != confirmPassword) {
      alert("Password do not match");
    } else if (password.length < 6) {
      alert("Password must be 6 digit long");
    } else {
      axios
        .post(`https://appleute-api.herokuapp.com/api/auth/signup`, {
          email: email,
          password: password,
        })
        .then((res) => {
          console.log("response from submitting the form successful", res.data);
          alert("Registered successfully, you can log in now");
        })
        .catch((err) => {
          console.log(err);
          alert("Check your email again, If already registered, Please login");
          console.log("ERROR  from update in form", err);
        });
    }
  }

  return (
    <div className="wrapper fadeInDown">
      <div id="formContent">
        <Link to="/login">
          <h2 className="inactive underlineHover"> Sign In </h2>
        </Link>
        <Link to="/signup">
          <h2 className="active ">Sign Up </h2>
        </Link>
        <form>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            id="login"
            className="fadeIn second"
            name="login"
            placeholder="Enter Email"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            id="password"
            className="fadeIn third"
            name="login"
            placeholder="password"
          />
          <input
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            id="password"
            className="fadeIn third"
            name="login"
            placeholder=" Confirm password"
          />
          <button
            className="fadeIn fourth loginBtn mt-4"
            onClick={Updatesubmit}
          >
            {" "}
            Sign Up{" "}
          </button>
        </form>

        {/* Remind Passowrd */}
        <div id="formFooter">
          <Link style={{ textDecoration: "none" }} to="/login">
            <p>Already have account ?</p>
            <p> Login</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
