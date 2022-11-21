import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import "../Products/products.css";

import Cookies from "universal-cookie";

export default function Order() {
  const [items, setItems] = useState([]);
  const cookies = new Cookies();
  const navigate = useNavigate();

  useEffect(() => {
    let id = cookies.get("id");
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
      .get(`https://appleute-api.herokuapp.com/get-order/${id}`)
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
                <Card.Title>Bill Amount : {item.bill}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Date : {item.date_added.substring(0, 10)}
                </Card.Subtitle>

                <p>Products Ordered</p>
                {item.items &&
                  item.items.map((prod, ind) => {
                    return (
                      <Card.Subtitle className="mb-2 text-muted">
                        {ind + 1}) {prod.name} , Rs {prod.price} , Quantity{" "}
                        {prod.quantity}
                      </Card.Subtitle>
                    );
                  })}
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
