import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import CourseList from './course_enrolled/CourseList';
import Navbar from './components/Navbar';
import ProfilePage from './components/ProfilePage';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/enroll" element={<CourseList />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="*" element={null} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

