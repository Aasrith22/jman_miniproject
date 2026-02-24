import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import InstructorDashboard from "../pages/InstructorDashboard";
import StudentDashboard from "../pages/StudentDashboard";
import ProtectedRoute from "../components/ProtectedRoute";
import UsersPage from "../pages/UsersPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/user" element={<UsersPage/>}/>

      <Route
        path="/instructor"
        element={
          <ProtectedRoute user_role="INSTRUCTOR">
            <InstructorDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/student"
        element={
          <ProtectedRoute user_role="STUDENT">
            <StudentDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}