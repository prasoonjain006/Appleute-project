import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import "./products.css";
import Cookies from "universal-cookie";

export default function Product() {
  const [items, setItems] = useState([]);
  const cookies = new Cookies();

  const handleAddToCart = (id) => {
    let userId = cookies.get("id");
    axios
      .post(`https://appleute-api.herokuapp.com/cart`, {
        userId: userId,
        productId: id,
        quantity: 1,
      })
      .then((res) => {
        console.log(res.data);
        alert("Succesfully Added to cart");
      })
      .catch((err) => {
        console.log(err);
        alert("Some error");
      });
  };

  useEffect(() => {
    axios
      .get(`https://appleute-api.herokuapp.com/items`)
      .then((res) => {
        console.log(res.data);
        setItems(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="flex-wrap">
      {items ? (
        items.map((item) => {
          return (
            <Card className="card-products" style={{ width: "18rem" }}>
              <Card.Body>
                <Card.Title>Name : {item.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Category : {item.category}
                </Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted">
                  Price : {item.price}
                </Card.Subtitle>

                <button
                  onClick={() => handleAddToCart(item._id)}
                  className="add-to-cart-btn"
                >
                  {" "}
                  Add to cart
                </button>
              </Card.Body>
            </Card>
          );
        })
      ) : (
        <></>
      )}
    </div>
  );
}
