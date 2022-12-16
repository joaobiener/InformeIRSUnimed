import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import Home from "./components/Home";
import NoPage from "./components/NoPage";
import CartoesBeneficiario from './components/CartoesBeneficiario';
import ArquivosList from './components/ArquivosList';
import ArquivosListBenf from './components/ArquivosListBenf';
import InformeIR from './components/InformeIR';
import Header from './components/Header';


function App()
{
  // const [showHeaderFooter, setshowHeaderFooter] = useState(true);

  // const location=useLocation();
  // setshowHeaderFooter(location.pathname!=="/components/InformeIR");

  return (
    
    <Router basename='/InformeIR'>
    <Header />
     
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/CartoesBeneficiario" element={<CartoesBeneficiario />} />
        <Route path="/ArquivosListBenf" element={<ArquivosListBenf />} />
        <Route path="/ArquivosList" element={<ArquivosList />} />
        <Route path="/InformeIR" element={<InformeIR />} />
      {/*   <Route path={`${process.env.REACT_APP_PUBLIC_URL }/InformeIR`} element={<InformeIR />} /> */}
        
       
        
        <Route path="*" element={<NoPage />} />

      </Routes>

    </Router>
  );
}

export default App;