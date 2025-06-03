import { Route, Routes } from "react-router-dom";


import Login from "./pages/login";
import Cadastro from "./pages/cadastro";
import DashBoard from "./pages/dashboard";
import GestaoPagamentos from "./pages/gestaoPagamentos";

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Login/>} />
      <Route path="/cadastro" element={<Cadastro/>} />
      <Route path="/inicio" element={<DashBoard/>} />
      <Route path="/gestaoPagamentos" element={<GestaoPagamentos/>} />
    </Routes>
    
  );
};