import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import CourseList from './course_enrolled/CourseList';
import Navbar from './components/Navbar';
import ProfilePage from './components/ProfilePage';
import EnrollmentPage from './enrollement_frontend/Enrollmentpage';
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

