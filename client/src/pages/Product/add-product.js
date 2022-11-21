import React from "react";
import "../Auth/Auth.css";
import axios from "axios";
import Cookies from "universal-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";

export default function AddProducts() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
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
      })
      .catch((err) => {
        console.log(err);
        cookies.set("token", "");
        navigate("/login");
      });
  }, []);

  function Updatesubmit(e) {
    e.preventDefault();
    if (name === "" || price === "" || category === "") {
      alert.error("Enter all the fields");
    } else {
      axios
        .post(`https://appleute-api.herokuapp.com/items`, {
          name: name,
          category: category,
          price: price,
        })
        .then((res) => {
          if (
            res.data === "Product with same name and category already exists"
          ) {
            alert(res.data);
          } else {
            alert("Product successfully added");
          }
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
          alert("Some error");
        });
    }
  }

  return (
    <>
      <Navbar />
      <div className="wrapper fadeInDown pt-6">
        <div id="formContent">
          <h2 className="active"> Add Products</h2>
          <div className="fadeIn first"></div>
          <form>
            <input
              onChange={(e) => setName(e.target.value)}
              type="text"
              id="login"
              className="fadeIn second mt-4"
              name="login"
              placeholder="Enter Product Name"
            />
            <input
              onChange={(e) => setCategory(e.target.value)}
              type="text"
              id="password"
              className="fadeIn third mt-4"
              name="login"
              placeholder="Enter Product Category"
            />

            <input
              onChange={(e) => setPrice(e.target.value)}
              type="text"
              id="password"
              className="fadeIn third mt-4"
              name="login"
              placeholder="Enter Product Price"
            />
            <button
              onClick={Updatesubmit}
              className="fadeIn fourth loginBtn mt-4"
            >
              {" "}
              Submit
            </button>
          </form>
          {/* Remind Passowrd */}
        </div>
      </div>
    </>
  );
}
