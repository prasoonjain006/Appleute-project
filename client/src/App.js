
import "./App.css";

import Login from './pages/Auth/login';
import Signup from "./pages/Auth/signup";
import { BrowserRouter, Route,  Router, Routes } from 'react-router-dom';
import Products from './pages/Product/product'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        <Route path="/" exact element={<Login/>} />
        <Route path="/login" exact element={<Login/>}  />
     
        <Route path="/signup" element={<Signup/>} />
        <Route path="/products" element={<Products/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
