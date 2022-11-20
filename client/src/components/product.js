import React from "react";
import { Link } from "react-router-dom";
// import { useAlert } from 'react-alert'
import axios from "axios";
import Cookies from "universal-cookie";
import { useEffect, useState } from "react";
import { Redirect, useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";

export default function Product() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/items`)
      .then((res) => {
        console.log(res.data);
        let arr = res.data;
        console.log("arr", arr);
        setItems(res.data);
        console.log(items);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="wrapper fadeInDown pt-6 mt-6">
      {items &&
        items.map((item) => {
          <div>
            <p>dddd</p>
            <Card style={{ width: "18rem" }}>
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {item.price}
                </Card.Subtitle>

                <Card.Link href="#">Add to cart</Card.Link>
              </Card.Body>
            </Card>
            ;
          </div>;
        })}
    </div>
  );
}
