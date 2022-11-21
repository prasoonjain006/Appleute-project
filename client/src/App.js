import "./App.css";

import Login from "./pages/Auth/login";
import Signup from "./pages/Auth/signup";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Products from "./pages/Product/product";
import "bootstrap/dist/css/bootstrap.min.css";
import Cart from "./pages/Cart/cart";
import Order from "./pages/Order/order";
import AddProducts from "./pages/Product/add-product";
import Users from "./pages/Users/users";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Login />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/users" element={<Users />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Order />} />
          <Route path="/add-products" exact element={<AddProducts />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
