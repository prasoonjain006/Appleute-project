import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import "./users.css";
import Navbar from "../../components/Navbar/Navbar";

export default function Users() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get(`https://appleute-api.herokuapp.com/api/auth/allusers`)
      .then((res) => {
        console.log(res.data.users);
        setItems(res.data.users);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Navbar />
      <h1>Total Users : {items && items.length}</h1>
      <div className="flex-wrap">
        {items ? (
          items.map((item) => {
            return (
              <Card className="card-products" style={{ width: "18rem" }}>
                <Card.Body>
                  <Card.Title>username : {item.email}</Card.Title>
                  {/* <Card.Subtitle className="mb-2 text-muted">
                   : {item.category}
                </Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted">
                  Price : {item.price}
                </Card.Subtitle> */}
                </Card.Body>
              </Card>
            );
          })
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
