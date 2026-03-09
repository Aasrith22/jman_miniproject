import React from 'react';
import StudentCourses from './components/StudentMyCourse/StudentCourses';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AssessmentModule from './components/CourseAssessment/AssessmentModule';
import MyCourseLayout from './components/MyCourseLayout';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MyCourseLayout />}>
            <Route path='mycourse' element={<StudentCourses />} />
            <Route path="mycourse/assessment" element={<AssessmentModule />} />
          </Route>
        </Routes>
      </BrowserRouter>


    </>
  );
}

export default App;
