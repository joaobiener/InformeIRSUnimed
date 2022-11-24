import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import NoPage from "./components/NoPage";
import CartoesBeneficiario from './components/CartoesBeneficiario';
import Footer from './components/Footer';
import InformeIR from './components/InformeIR';
import Header from './components/Header';


function App()
{
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/CartoesBeneficiario"  element={<CartoesBeneficiario />} />
          <Route path="/InformeIR"  element={<InformeIR />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>

    </BrowserRouter>
  );
}

export default App;