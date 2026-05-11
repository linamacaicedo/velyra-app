import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../pages/Home";

import HostLogin from "../pages/host/HostLogin";
import HostRegister from "../pages/host/HostRegister";
import HostDashboard from "../pages/host/HostDashboard";
import CreateSession from "../pages/host/CreateSession";
import SessionDetails from "../pages/host/SessionDetails";
import LiveResults from "../pages/host/LiveResults";

import JoinSession from "../pages/voter/JoinSession";
import VotePage from "../pages/voter/VotePage";
import ThankYou from "../pages/voter/ThankYou";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Navigate to="/host/login" />} />
      <Route path="/register" element={<Navigate to="/host/register" />} />

      <Route path="/host/login" element={<HostLogin />} />
      <Route path="/host/register" element={<HostRegister />} />
      <Route path="/host/dashboard" element={<HostDashboard />} />
      <Route path="/host/create" element={<CreateSession />} />
      <Route path="/host/session/:id" element={<SessionDetails />} />
      <Route path="/host/results/:sessionId" element={<LiveResults />} />

      <Route path="/join" element={<JoinSession />} />
      <Route path="/vote" element={<VotePage />} />
      <Route path="/thank-you" element={<ThankYou />} />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default AppRoutes;