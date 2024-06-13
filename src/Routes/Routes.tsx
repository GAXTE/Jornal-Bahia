import { Route, Routes } from "react-router-dom";
import { Homepage } from "../Pages/HomePage/Homepage";

export const RouterMain = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
      </Routes>
    </>
  );
};
