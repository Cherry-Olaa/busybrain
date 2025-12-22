import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import StudentResults from "./pages/ResultsCheck";
import ResultsAdmin from "./pages/ResultsAdmin";
import NotFound from "./pages/NotFound";
import StudentDashboard from "./pages/StudentDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import RegisterStudent from "@/pages/admin/RegisterStudent";
import ResultUpload from "@/pages/admin/ResultUpload";
import StudentsList from "@/pages/admin/StudentsList";
import CreatStaff from "@/pages/admin/CreateStaff";
import StaffList from "./pages/admin/StaffList";
import Settings from "./pages/admin/Settings";
import StaffDashboard from "./pages/Staff/StaffDashboard";
import StaffResult from "./pages/Staff/StaffResult";
import StaffSettings from "./pages/Staff/settings";
import StaffViewStudentResult from "./pages/Staff/staffViewStudentResult";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-out-cubic",
      once: false,
      offset: 100,
    });

    AOS.refresh(); // ensures animations work after route changes
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />

              {/* Student public result checking */}
              <Route path="/results-check" element={<StudentResults />} />

              {/* Admin protected */}
              <Route
                path="/results-admin"
                element={
                  <ProtectedRoute>
                    <ResultsAdmin />
                  </ProtectedRoute>
                }
              />

              {/* Staff */}
              <Route path="/staff" element={<StaffDashboard />} />
              <Route path="/staff/results" element={<StaffResult />} />
              <Route path="/staff/settings" element={<StaffSettings />} />
              <Route
                path="/staff/view-results/:studentId"
                element={<StaffViewStudentResult />}
              />

              {/* Admin */}
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/students" element={<StudentsList />} />
              <Route path="/admin/results" element={<ResultUpload />} />
              <Route path="/admin/create-staff" element={<CreatStaff />} />
              <Route path="/admin/staff" element={<StaffList />} />
              <Route path="/admin/register-student" element={<RegisterStudent />} />
              <Route path="/admin/settings" element={<Settings />} />

              {/* Student */}
              <Route path="/dashboard-student" element={<StudentDashboard />} />

              {/* Catch-all */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
