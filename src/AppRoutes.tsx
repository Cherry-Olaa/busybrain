// src/AppRoutes.tsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import StudentResults from "./pages/ResultsCheck";
import StudentDashboard from "./pages/StudentDashboard";
import ResultsAdmin from "./pages/ResultsAdmin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import RegisterStudent from "./pages/admin/RegisterStudent";
import ResultUpload from "./pages/admin/ResultUpload";
import StudentsList from "./pages/admin/StudentsList";
import CreatStaff from "./pages/admin/CreateStaff";
import StaffList from "./pages/admin/StaffList";
import Settings from "./pages/admin/Settings";
import StaffDashboard from "./pages/Staff/StaffDashboard";
import StaffResult from "./pages/Staff/StaffResult";
import StaffSettings from "./pages/Staff/settings";
import NotFound from "./pages/NotFound";

const AppRoutes: React.FC = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />

      {/* Student */}
      <Route
        path="/dashboard-student"
        element={user?.role === "student" ? <StudentDashboard /> : <Login />}
      />
      <Route path="/results-check" element={<StudentResults />} />

      {/* Staff */}
      <Route
        path="/staff"
        element={user?.role === "staff" ? <StaffDashboard /> : <Login />}
      />
      <Route
        path="/staff/results"
        element={user?.role === "staff" ? <StaffResult /> : <Login />}
      />
      <Route
        path="/staff/settings"
        element={user?.role === "staff" ? <StaffSettings /> : <Login />}
      />

      {/* Admin */}
      <Route
        path="/admin"
        element={user?.role === "admin" ? <AdminDashboard /> : <Login />}
      />
      <Route
        path="/admin/students"
        element={user?.role === "admin" ? <StudentsList /> : <Login />}
      />
      <Route
        path="/admin/results"
        element={user?.role === "admin" ? <ResultUpload /> : <Login />}
      />
      <Route
        path="/admin/create-staff"
        element={user?.role === "admin" ? <CreatStaff /> : <Login />}
      />
      <Route
        path="/admin/Staff"
        element={user?.role === "admin" ? <StaffList /> : <Login />}
      />
      <Route
        path="/admin/register-student"
        element={user?.role === "admin" ? <RegisterStudent /> : <Login />}
      />
      <Route
        path="/admin/settings"
        element={user?.role === "admin" ? <Settings /> : <Login />}
      />
      <Route
        path="/results-admin"
        element={user?.role === "admin" ? <ResultsAdmin /> : <Login />}
      />

      {/* Catch-all */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;