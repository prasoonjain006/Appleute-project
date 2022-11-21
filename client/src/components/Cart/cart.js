import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import {useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import "../Products/products.css";

import Cookies from "universal-cookie";

export default function Cart() {
  const [items, setItems] = useState([]);
  const [cart, setCart] = useState("");
  const [checkDelete, setCheckDelete] = useState(false);
  const cookies = new Cookies();
  const navigate = useNavigate();

  const handleDeleteToCart = (id) => {
    let userId = cookies.get("id");

    axios
      .post(`https://appleute-api.herokuapp.com/cart/delete`, {
        userId: userId,
        productId: id,
      })
      .then((res) => {
        console.log(res.data);
        alert("Succesfully Deleted from to cart");
        setCheckDelete(!checkDelete);
      })
      .catch((err) => {
        console.log(err);
        alert("Some error");
      });
  };

  const handleCheckout = (id) => {
    let userId = cookies.get("id");

    axios
      .post(`https://appleute-api.herokuapp.com/order`, {
        userId: userId,
      })
      .then((res) => {
        console.log(res.data);
        let bill = res.data.bill;
        let date = res.data.date_added.substring(0, 10);
        alert(
          `Succesfully placed the order, payment done of Rs  ${bill} \n Date of order - ${date} \n  `
        );
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        alert("Some error");
      });
  };

  useEffect(() => {
    let id = cookies.get("id");
    console.log(id);

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

    axios
      .get(`https://appleute-api.herokuapp.com/cart/${id}`)
      .then((res) => {
        console.log(res.data);
        setItems(res.data.items);
        setCart(res.data);
        console.log(items);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [checkDelete]);

  return (
    <>
      <div className="flex-wrap">
        {items ? (
          items.map((item) => {
            return (
              <Card className="card-products" style={{ width: "18rem" }}>
                <Card.Body>
                  <Card.Title>Name : {item.name}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    Quantity: {item.quantity}
                  </Card.Subtitle>
                  <Card.Subtitle className="mb-2 text-muted">
                    Price : {item.price}
                  </Card.Subtitle>

                  <button
                    onClick={() => handleDeleteToCart(item.productId)}
                    className="add-to-cart-btn"
                  >
                    {" "}
                    Delete from cart
                  </button>
                </Card.Body>
              </Card>
            );
          })
        ) : (
          <></>
        )}
      </div>
      <h1>Total Amount : Rs {cart.bill ? cart.bill : 0}</h1>
      {cart.bill ? (
        <h2>
          <button onClick={handleCheckout} className="checkout-btn">
            Check out
          </button>
        </h2>
      ) : (
        <></>
      )}
    </>
  );
}