import { createRoot } from "react-dom/client";
import Home from "./pages/Home/index.jsx";
import CreatePass from "./pages/Create-pass/index.jsx";
import Room from "./pages/Room/index.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import RoomError from "./pages/RoomError/index.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    {/* Routes */}
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create-pass" element={<CreatePass />} />
      <Route path="/room/:code" element={<Room />} />
      <Route path="/room/error" element={<RoomError />} />
    </Routes>
  </BrowserRouter>
);
