import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Dashboard from "../pages/Dashboard";
import ChatPage from "../pages/ChatPage";
import RootLayout from "../layouts/RootLayout";
import AuthLayout from "../layouts/AuthLayout";
import DashBoardLayout from "../layouts/DashBoardLayout";
import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";

const RouteManagement = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route path="" element={<HomePage />} />
          <Route path="/dashboard" element={<DashBoardLayout />}>
            <Route path="" element={<Dashboard />} />
            <Route path="chats/:id" element={<ChatPage />} />
          </Route>
        </Route>
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="sign-in/*" element={<LoginPage />} />
          <Route path="sign-up/*" element={<SignUpPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default RouteManagement;
