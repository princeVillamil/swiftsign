import { Routes, Route } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Dashboard } from "@/pages/Dashboard";
import { Upload } from "@/pages/Upload";
import { Sign } from "@/pages/Sign";
import { Success } from "@/pages/Success";
import Home from "./pages/Home";

import Help from "./pages/Help";
import DocumentPreview from "./pages/DocumentPreview";

function App() {
  return (
    <Routes>
      {/* Public pages */}
      <Route path="/sign/:token" element={<Sign />} />
      <Route path="/" element={<Home />} />
      
      {/* Pages with sidebar layout */}
      <Route path="/success" element={
        <DashboardLayout><Success /></DashboardLayout>
      } />
      <Route path="/dashboard" element={
        <DashboardLayout><Dashboard /></DashboardLayout>
      } />
      <Route path="/upload" element={
        <DashboardLayout><Upload /></DashboardLayout>
      } />
      <Route path="/help" element={
        <DashboardLayout><Help /></DashboardLayout>
      } />
      <Route path="/documents/:id" element={
        <DashboardLayout><DocumentPreview /></DashboardLayout>
      } />
    </Routes>
  );
}

export default App;