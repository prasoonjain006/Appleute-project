import React from "react";
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from "./NavbarElements";
import Cookies from "universal-cookie";

const Navbar = () => {
  const cookies = new Cookies();
  return (
    <>
      <Nav>
        <Bars />
        <NavMenu>
          <NavLink to="/add-products" activeStyle>
            Add new Products
          </NavLink>
          <NavLink to="/cart" activeStyle>
            Cart
          </NavLink>
          <NavLink to="/products" activeStyle>
            Products
          </NavLink>
          <NavLink to="/orders" activeStyle>
            My Orders
          </NavLink>
          <NavLink to="/users" activeStyle>
            All users
          </NavLink>
        </NavMenu>
        <NavBtn>
          <NavBtnLink
            to="/login"
            onClick={() => {
              cookies.set("token", null);
              cookies.set("id", null);
            }}
          >
            Log Out
          </NavBtnLink>
        </NavBtn>
      </Nav>
    </>
  );
};

export default Navbar;
