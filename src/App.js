import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import Home from "./components/Home";
import NoPage from "./components/NoPage";
import CartoesBeneficiario from './components/CartoesBeneficiario';
import InformeIR from './components/InformeIR';
import Header from './components/Header';
import { useState } from 'react';


function App()
{
  // const [showHeaderFooter, setshowHeaderFooter] = useState(true);

  // const location=useLocation();
  // setshowHeaderFooter(location.pathname!=="/components/InformeIR");

  return (
    <Router>
    <Header />
     
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/CartoesBeneficiario" element={<CartoesBeneficiario />} />
        <Route path="/InformeIR" element={<InformeIR />} />
       
        
        <Route path="*" element={<NoPage />} />

      </Routes>

    </Router>
  );
}

export default App;