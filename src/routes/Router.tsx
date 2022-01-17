import { BrowserRouter, Routes, Route } from "react-router-dom";
import Coins from "./Coins";
import Coin from "./Coin";
import Nav from "../components/Nav";

function Router() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Coins />} />
        <Route path="/:coinId/*" element={<Coin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
