import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import NoPage from "./components/NoPage";
import CartoesBeneficiario from './components/CartoesBeneficiario';
import InformeIR from './components/InformeIR';
import Navbar  from './components/Navbar';
import Menu from './components/Menu';
import Header from './components/Header';



function App()
{
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