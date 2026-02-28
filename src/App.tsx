// import { useEffect } from "react";
// import AOS from "aos";
// import "aos/dist/aos.css";

// import { Toaster } from "@/components/ui/toaster";
// import { Toaster as Sonner } from "@/components/ui/sonner";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { AuthProvider } from "@/contexts/AuthContext";

// import Home from "./pages/Home";
// import About from "./pages/About";
// import Contact from "./pages/Contact";
// import Login from "./pages/Login";
// import StudentResults from "./pages/ResultsCheck";
// import ResultsAdmin from "./pages/ResultsAdmin";
// import NotFound from "./pages/NotFound";
// import StudentDashboard from "./pages/StudentDashboard";
// import ProtectedRoute from "./components/ProtectedRoute";
// import AdminDashboard from "@/pages/admin/AdminDashboard";
// import RegisterStudent from "@/pages/admin/RegisterStudent";
// import ResultUpload from "@/pages/admin/ResultUpload";
// import StudentsList from "@/pages/admin/StudentsList";
// import CreatStaff from "@/pages/admin/CreateStaff";
// import StaffList from "./pages/admin/StaffList";
// import Settings from "./pages/admin/Settings";
// import StaffDashboard from "./pages/Staff/StaffDashboard";
// import StaffResult from "./pages/Staff/StaffResult";
// import StaffSettings from "./pages/Staff/settings";
// import StaffViewStudentResult from "./pages/Staff/staffViewStudentResult";

// const queryClient = new QueryClient();

// const App = () => {
//   useEffect(() => {
//     AOS.init({
//       duration: 800,
//       easing: "ease-out-cubic",
//       once: false,
//       offset: 100,
//     });

//     AOS.refresh(); // ensures animations work after route changes
//   }, []);

//   return (
//     <QueryClientProvider client={queryClient}>
//       <AuthProvider>
//         <TooltipProvider>
//           <Toaster />
//           <Sonner />
//           <BrowserRouter>
//             <Routes>
//               <Route path="/" element={<Home />} />
//               <Route path="/about" element={<About />} />
//               <Route path="/contact" element={<Contact />} />
//               <Route path="/login" element={<Login />} />

//               {/* Student public result checking */}
//               <Route path="/results-check" element={<StudentResults />} />

//               {/* Admin protected */}
//               <Route
//                 path="/results-admin"
//                 element={
//                   <ProtectedRoute>
//                     <ResultsAdmin />
//                   </ProtectedRoute>
//                 }
//               />

//               {/* Staff */}
//               <Route path="/staff" element={<StaffDashboard />} />
//               <Route path="/staff/results" element={<StaffResult />} />
//               <Route path="/staff/settings" element={<StaffSettings />} />
//               <Route
//                 path="/staff/view-results/:studentId"
//                 element={<StaffViewStudentResult />}
//               />

//               {/* Admin */}
//               <Route path="/admin" element={<AdminDashboard />} />
//               <Route path="/admin/students" element={<StudentsList />} />
//               <Route path="/admin/results" element={<ResultUpload />} />
//               <Route path="/admin/create-staff" element={<CreatStaff />} />
//               <Route path="/admin/staff" element={<StaffList />} />
//               <Route path="/admin/register-student" element={<RegisterStudent />} />
//               <Route path="/admin/settings" element={<Settings />} />

//               {/* Student */}
//               <Route path="/dashboard-student" element={<StudentDashboard />} />

//               {/* Catch-all */}
//               <Route path="*" element={<NotFound />} />
//             </Routes>
//           </BrowserRouter>
//         </TooltipProvider>
//       </AuthProvider>
//     </QueryClientProvider>
//   );
// };

// export default App;
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";

// Public Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import StudentResults from "./pages/ResultsCheck";
import Careers from "./pages/Careers";
import KidsZone from "./pages/public/KidsZone";
import GameTemplate from "@/pages/games/GameTemplate";
import NotFound from "./pages/NotFound";

// Admin Pages
import AdminDashboard from "@/pages/admin/AdminDashboard";
import RegisterStudent from "@/pages/admin/RegisterStudent";
import ResultUpload from "@/pages/admin/ResultUpload";
import StudentsList from "@/pages/admin/StudentsList";
import StudentDetails from "@/pages/admin/StudentDetails";
import EditStudent from "@/pages/admin/EditStudent";
import StudentManagement from "@/pages/admin/StudentManagement";
import CreatStaff from "@/pages/admin/CreateStaff";
import StaffList from "./pages/admin/StaffList";
import StaffManagement from "@/pages/admin/StaffManagement";
import Settings from "./pages/admin/Settings";
import ResultsAdmin from "./pages/ResultsAdmin";
import ClassSubjects from "@/pages/admin/ClassSubjects";
import JobManagement from "@/pages/admin/JobManagement";
import CreateJob from "@/pages/admin/CreateJob";
import JobApplications from "@/pages/admin/JobApplications";

// Staff Pages
import StaffDashboard from "./pages/Staff/StaffDashboard";
import StaffResult from "./pages/Staff/StaffResult";
import StaffSettings from "./pages/Staff/settings";
import StaffViewStudentResult from "./pages/Staff/staffViewStudentResult";
import SubjectRegistration from "./pages/Staff/SubjectRegistration";
import StaffBulkResultUpload from "./pages/Staff/StaffResult";

// Student Pages
import StudentDashboard from "./pages/StudentDashboard";
import Games from "@/pages/student/Games";
// Add this import
import JobDetails from "./pages/JobDetails";

// Add this route in the PUBLIC ROUTES section

// Components
import ProtectedRoute from "./components/ProtectedRoute";
import { ScrollToTop } from "./components/ScrollToTop";
// Add imports

import ApplyJob from "./pages/ApplyJob";
// Add import
import ApplicationSuccess from "./pages/ApplicationSuccess";



const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-out-cubic",
      once: false,
      offset: 100,
    });
    AOS.refresh();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              {/* ============ PUBLIC ROUTES ============ */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/results-check" element={<StudentResults />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/kids-zone" element={<KidsZone />} />
              <Route path="/games/:gameId" element={<GameTemplate />} />
              <Route path="/careers/:slug" element={<JobDetails />} />

              <Route path="/apply/:slug" element={<ApplyJob />} />
        
              <Route path="/careers/:slug/success" element={<ApplicationSuccess />} />

              {/* ============ ADMIN ROUTES ============ */}
              <Route path="/admin" element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminDashboard />
                </ProtectedRoute>
              } />

              {/* Student Management */}
              <Route path="/admin/students" element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <StudentsList />
                </ProtectedRoute>
              } />
              <Route path="/admin/students/:id" element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <StudentDetails />
                </ProtectedRoute>
              } />
              <Route path="/admin/students/edit/:id" element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <EditStudent />
                </ProtectedRoute>
              } />
              <Route path="/admin/student-management" element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <StudentManagement />
                </ProtectedRoute>
              } />
              <Route path="/admin/register-student" element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <RegisterStudent />
                </ProtectedRoute>
              } />

              {/* Staff Management */}
              <Route path="/admin/staff" element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <StaffList />
                </ProtectedRoute>
              } />
              <Route path="/admin/create-staff" element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <CreatStaff />
                </ProtectedRoute>
              } />
              <Route path="/admin/staff-management" element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <StaffManagement />
                </ProtectedRoute>
              } />

              {/* Academic Management */}
              <Route path="/admin/class-subjects" element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <ClassSubjects />
                </ProtectedRoute>
              } />
              <Route path="/admin/results" element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <ResultUpload />
                </ProtectedRoute>
              } />
              <Route path="/results-admin" element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <ResultsAdmin />
                </ProtectedRoute>
              } />

              {/* Job Management */}
              <Route path="/admin/jobs" element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <JobManagement />
                </ProtectedRoute>
              } />
              <Route path="/admin/jobs/create" element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <CreateJob />
                </ProtectedRoute>
              } />
              <Route path="/admin/jobs/edit/:id" element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <CreateJob />
                </ProtectedRoute>
              } />
              <Route path="/admin/jobs/:jobId/applications" element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <JobApplications />
                </ProtectedRoute>
              } />

              {/* Settings */}
              <Route path="/admin/settings" element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <Settings />
                </ProtectedRoute>
              } />

              {/* ============ STAFF ROUTES ============ */}
              <Route path="/staff" element={
                <ProtectedRoute allowedRoles={["staff"]}>
                  <StaffDashboard />
                </ProtectedRoute>
              } />
              <Route path="/staff/results" element={
                <ProtectedRoute allowedRoles={["staff"]}>
                  <StaffResult />
                </ProtectedRoute>
              } />
              <Route path="/staff/bulk-results" element={
                <ProtectedRoute allowedRoles={["staff"]}>
                  <StaffBulkResultUpload />
                </ProtectedRoute>
              } />
              <Route path="/staff/subject-registration" element={
                <ProtectedRoute allowedRoles={["staff"]}>
                  <SubjectRegistration />
                </ProtectedRoute>
              } />
              <Route path="/staff/settings" element={
                <ProtectedRoute allowedRoles={["staff"]}>
                  <StaffSettings />
                </ProtectedRoute>
              } />
              <Route path="/staff/view-results/:studentId" element={
                <ProtectedRoute allowedRoles={["staff"]}>
                  <StaffViewStudentResult />
                </ProtectedRoute>
              } />

              {/* ============ STUDENT ROUTES ============ */}
              <Route path="/dashboard-student" element={
                <ProtectedRoute allowedRoles={["student"]}>
                  <StudentDashboard />
                </ProtectedRoute>
              } />
              <Route path="/student/games" element={
                <ProtectedRoute allowedRoles={["student"]}>
                  <Games />
                </ProtectedRoute>
              } />

              {/* ============ CATCH-ALL ============ */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;