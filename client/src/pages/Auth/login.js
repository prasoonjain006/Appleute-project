import React from "react";
import { Link } from "react-router-dom";
import "./Auth.css";
import axios from "axios";
import Cookies from "universal-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const cookies = new Cookies();
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
        navigate("/login");
      });
  }, []);

  function Updatesubmit(e) {
    e.preventDefault();
    if (password === "" || email === "") {
      alert.error("Enter password and email");
    } else {
      axios
        .post(`https://appleute-api.herokuapp.com/api/auth/signin`, {
          email: email,
          password: password,
        })
        .then((res) => {
          alert("Login success");
          console.log(res.data);
          cookies.set("id", res.data.id);
          cookies.set("token", res.data.accessToken);
          cookies.set("email", res.data.email);
          navigate("/products");
        })
        .catch((err) => {
          console.log(err);
          alert("Some error");
        });
    }
  }

  return (
    <div className="wrapper fadeInDown pt-6">
      <div id="formContent">
        {/* Tabs Titles */}
        <h2 className="active"> Sign In </h2>

        <Link to="/signup">
          <h2 className="inactive underlineHover">Sign Up </h2>
        </Link>
        {/* Icon */}
        <div className="fadeIn first">
          {/* <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.uwzHgxlvqbIRmGT_kOtXAgHaFj%26pid%3DApi&f=1" id="icon" alt="User Icon" /> */}
        </div>
        {/* Login Form */}
        <form>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            id="login"
            className="fadeIn second mt-4"
            name="login"
            placeholder="Enter Email"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            id="password"
            className="fadeIn third mt-4"
            name="login"
            placeholder="password"
          />
          <button
            onClick={Updatesubmit}
            className="fadeIn fourth loginBtn mt-4"
          >
            {" "}
            Login
          </button>
        </form>
        {/* Remind Passowrd */}
      </div>
    </div>
  );
}
