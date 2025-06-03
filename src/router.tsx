import { Route, Routes } from "react-router-dom";

import LoginPage from "./pages/page";

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage/>} />
    </Routes>
  );
};