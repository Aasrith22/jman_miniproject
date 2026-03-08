import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import InstructorDashboard from "../pages/InstructorDashboard";
import StudentDashboard from "../pages/StudentDashboard";
import ProtectedRoute from "../components/ProtectedRoute";
import UsersPage from "../pages/UsersPage";
import CourseForm from "../components/forms/CourseForm";
import CourseBuilder from "../pages/CourseBuilder";

// YOUR NEW IMPORTS
import BrowseCourses from "../pages/BrowseCourses";
import CourseDetails from "../pages/CourseDetails";

export default function AppRoutes() {
  return (
    <Routes>

      {/* Public Routes */}
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/user" element={<UsersPage />} />

      {/* Instructor Dashboard */}
      <Route
        path="/instructor"
        element={
          <ProtectedRoute user_role="INSTRUCTOR">
            <InstructorDashboard />
          </ProtectedRoute>
        }
      />

      {/* Student Dashboard */}
      <Route
        path="/student"
        element={
          <ProtectedRoute user_role="STUDENT">
            <StudentDashboard />
          </ProtectedRoute>
        }
      />

      {/* YOUR MODULE - Browse Courses */}
      <Route
        path="/courses"
        element={
          <ProtectedRoute user_role="STUDENT">
            <BrowseCourses />
          </ProtectedRoute>
        }
      />

      {/* Course Details */}
      <Route
        path="/courses/:courseId"
        element={
          <ProtectedRoute user_role="STUDENT">
            <CourseDetails />
          </ProtectedRoute>
        }
      />

      {/* Instructor Create Course */}
      <Route
        path="/instructor/:instructorId/course/create"
        element={<CourseForm />}
      />

      {/* Course Module Builder */}
      <Route
        path="/coursemodule/:courseId"
        element={<CourseBuilder />}
      />

    </Routes>
  );
}