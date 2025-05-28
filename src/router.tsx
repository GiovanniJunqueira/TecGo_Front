import { Route, Routes } from "react-router-dom";

import Test from "./pages/test";

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Test/>} />
    </Routes>
  );
};