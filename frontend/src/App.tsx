import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import DashboardLayout from "./components/DashboardLayout";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Documents from "./pages/Documents";
import Success from "./pages/Success";
import SignIn from "./pages/SignIn";
import Register from "./pages/Register";
import Inbox from "./pages/Inbox";
import Sent from "./pages/Sent";
import Upload from "./pages/Upload";
import "./App.css";

function App() {
  return (
    <Routes>
      {/* Auth Routes */}
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/register" element={<Register />} />

      {/* Public Routes with Main Layout */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
      </Route>

      {/* Protected/Dashboard Routes with Dashboard Layout */}
      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/documents" element={<Documents />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/inbox" element={<Inbox />} />
        <Route path="/sent" element={<Sent />} />
        <Route path="/success" element={<Success />} />
        <Route path="/templates" element={<div>Templates Content</div>} />
        <Route path="/settings" element={<div>Settings Content</div>} />
      </Route>

      {/* Redirects */}
      <Route path="/home" element={<Navigate to="/" replace />} />
      <Route path="*" element={<div>Not Found</div>} />
    </Routes>
  );
}

export default App;
