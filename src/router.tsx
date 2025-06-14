import { Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { MainLayout } from "./layouts/MainLayout"; // <-- Importe o novo Layout

import Login from "./pages/login";
import Cadastro from "./pages/cadastro";
import DashBoard from "./pages/dashboard";
import GestaoPagamentos from "./pages/gestaoPagamentos";
import GestaoAlunos from "./pages/gestaoAlunos";
import Escalacao from "./pages/escalacao";
import Partidas from "./pages/partidas";

export const Router = () => {
  return (
    <ThemeProvider>
      <Routes>
        {/* Rotas públicas fora do layout principal */}
        <Route path="/" element={<Login/>} />
        <Route path="/cadastro" element={<Cadastro/>} />

        {/* Rotas privadas que USAM o layout com Header e Sidebar */}
        <Route element={<MainLayout />}>
          <Route path="/inicio" element={<DashBoard/>} />
          <Route path="/gestaoPagamentos" element={<GestaoPagamentos/>} />
          <Route path="/gestaoAlunos" element={<GestaoAlunos/>} />
          <Route path="/escalacao" element={<Escalacao/>} />
          <Route path="/partidas" element={<Partidas/>} />
          {/* Adicione outras rotas que usarão o mesmo layout aqui */}
        </Route>
      </Routes>
    </ThemeProvider>
  );
};