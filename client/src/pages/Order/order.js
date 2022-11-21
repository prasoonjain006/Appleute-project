import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Orders from "../../components/Orders/order";

export default function Order() {
  return (
    <>
      <Navbar />
      <h1>All Orders</h1>
      <Orders />
    </>
  );
}
