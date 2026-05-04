import { createRoot } from "react-dom/client";
import Home from "./pages/Home/index.jsx";
import CreatePass from "./pages/Create-pass/index.jsx";
import Room from "./pages/Room/index.jsx";
import RoomError from "./pages/RoomError/index.jsx";
import Login from "./pages/Login/login.jsx";
import Signup from "./pages/Signup/signup.jsx";
import UserPage from "./pages/UserPage/userPage.jsx";
import UsersList from "./pages/UsersList/users-list.jsx";
import AdminPage from "./pages/AdminPage/index.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import { AuthProvider } from "./context/auth.jsx";
import { Provider } from "@/components/ui/provider";
import PrivateRoutes from "./routes/privateRoutes.jsx";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <Provider>
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<Home />} />
            <Route path="/create-pass" element={<CreatePass />} />
            <Route path="/room/:code" element={<Room />} />
            <Route path="/room/error" element={<RoomError />} />
            <Route path="/user" element={<UserPage />} />
          </Route>

          <Route element={<PrivateRoutes role="admin" />}>
            <Route path="/users" element={<UsersList />}></Route>
            <Route path="/admin" element={<AdminPage />} />
          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </AuthProvider>,
);
