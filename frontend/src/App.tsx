import React from 'react';
<<<<<<< HEAD
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import CourseList from './components/enrollment/course_enrolled/CourseList';
import Navbar from './components/enrollment/Navbar';
import ProfilePage from './components/enrollment/ProfilePage';
import EnrollmentPage from './components/enrollment/enrollement_frontend/Enrollmentpage';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/my-courses" element={<CourseList />} />
          <Route path="/enroll" element={<CourseList enrolledOnly />} />
          <Route path="/enrollment/:courseId" element={<EnrollmentPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="*" element={null} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

=======
import './App.css';
import AppRoutes from './routes/AppRoutes';

function App() {
  return <AppRoutes />;
}

export default App;
>>>>>>> bc93bb1031f82fbd76dd90d7cbfbbd977fa7ca79
