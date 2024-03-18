import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layout/layout";
import Home from "./pages/home/Home";
import LoginForm from "./pages/login/Login";
import RegistrationForm from "./pages/login/RegistrationForm";
import CreateProduct from "./pages/create-product/CreateProduct";
import 'react-toastify/dist/ReactToastify.css';
import CategoryPage from "./pages/single-category/CategoryPage";
import { SupportPage } from "./pages/support/SupportPage";
import ProductDetailPage from "./pages/product-detail/ProductDetail";


function App() {
  return (
    <Router>
      <Routes>
        <Route path ="/" element = {<Layout/>}>
          <Route index element = {<Home/>}/>
          <Route path="/login" element = {<LoginForm/>}/>
          <Route path="/register" element = {<RegistrationForm/>}/>
          <Route path="/createproduct" element = {<CreateProduct/>}/>
          <Route path="/:categoryKey" element={<CategoryPage />} />
          <Route path="/supportPage" element = {<SupportPage/>}/>
          <Route path="/all/:id" element={<ProductDetailPage />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
