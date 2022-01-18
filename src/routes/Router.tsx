import { BrowserRouter, Routes, Route } from "react-router-dom";
import Coins from "./Coins";
import Coin from "./Coin";
import Home from "./Home";
import Nav from "../components/Nav";

function Router() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/coins" element={<Coins />} />
        <Route path="/:coinId/*" element={<Coin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
