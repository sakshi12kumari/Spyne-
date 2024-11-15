import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import './App.css';
import RegisterPage from "./Pages/RegisterPage";
import ProductCreationPage from "./Pages/ProductCreationPage";
import ProductDetailPage from "./Pages/ProductDetailPage";
import ProductListPage from "./Pages/ProductListPage";

function App() {
  return (
    <div>
     <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/productCreation" element={<ProductCreationPage />} />
          <Route path="/productDetail" element={<ProductDetailPage />} />
          <Route path="/list" element={<ProductListPage />} />
        </Routes>
      </BrowserRouter> 
    </div>
  );
}

export default App;
