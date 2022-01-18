import { BrowserRouter, Routes, Route } from "react-router-dom";
import Coins from "./Coins";
import Coin from "./Coin";
import Home from "./Home";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

function Router() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/coins" element={<Coins />} />
        <Route path="/:coinId/*" element={<Coin />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default Router;
