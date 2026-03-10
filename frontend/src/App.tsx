import React from 'react';
import StudentCourses from './components/MyCourses/StudentMyCourse/StudentCourses';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AssessmentModule from './components/MyCourses/CourseAssessment/AssessmentModule';
import MyCourseLayout from './components/MyCourseLayout';
import Login from './components/AuthTesting/Login';
import Register from './components/AuthTesting/Register';
import AssessmentCompletionModule from './components/MyCourses/CourseAssessment/AssessmentCompletionModule';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MyCourseLayout />}>
            <Route path='mycourse' element={<StudentCourses />} />
            <Route path="mycourse/assessment" element={<AssessmentModule />} />
            <Route path="mycourse/assessment/completion" element={<AssessmentCompletionModule />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
        </Routes>
      </BrowserRouter>


    </>
  );
}

export default App;
