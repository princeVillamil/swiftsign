import { Routes, Route } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Dashboard } from "@/pages/Dashboard";
import { Upload } from "@/pages/Upload";
import { Sign } from "@/pages/Sign";
import { Success } from "@/pages/Success";
import Home from "./pages/Home";


function App() {
  return (
    <Routes>
      {/* Public pages */}
      <Route path="/sign/:token" element={<Sign />} />
      <Route path="/" element={<Home />} />
      
      {/* Pages with sidebar layout */}
      <Route path="/success" element={
        <Success />
      } />
      <Route path="/dashboard" element={
        <DashboardLayout><Dashboard /></DashboardLayout>
      } />
      <Route path="/upload" element={
        <DashboardLayout><Upload /></DashboardLayout>
      } />

    </Routes>
  );
}

export default App;