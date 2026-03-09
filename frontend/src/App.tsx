import React, { useEffect, useState } from 'react';
import './App.css';
<<<<<<< HEAD
import {
  fetchOverview,
  fetchCourseStats,
  fetchAssessmentPerformance,
  fetchStudentPerformance,
  fetchRecentAttempts,
  OverviewStats,
  CourseStat,
  AssessmentStat,
  StudentStat,
  RecentAttempt,
} from './api';
import OverviewCards from './components/OverviewCards';
import CourseTable from './components/CourseTable';
import AssessmentTable from './components/AssessmentTable';
import StudentTable from './components/StudentTable';
import RecentAttempts from './components/RecentAttempts';
=======
import Login from './pages/Login';
import AppRoutes from './routes/AppRoutes';
import UsersPage from './pages/UsersPage';
>>>>>>> b0cc7eb311991362938ed087c7ff9f4dcad9f02a

function App() {
  const [overview, setOverview] = useState<OverviewStats | null>(null);
  const [courses, setCourses] = useState<CourseStat[]>([]);
  const [assessments, setAssessments] = useState<AssessmentStat[]>([]);
  const [students, setStudents] = useState<StudentStat[]>([]);
  const [recentAttempts, setRecentAttempts] = useState<RecentAttempt[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([
      fetchOverview(),
      fetchCourseStats(),
      fetchAssessmentPerformance(),
      fetchStudentPerformance(),
      fetchRecentAttempts(),
    ])
      .then(([ov, co, as, st, ra]) => {
        setOverview(ov);
        setCourses(co);
        setAssessments(as);
        setStudents(st);
        setRecentAttempts(ra);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="loading">Loading dashboard...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
<<<<<<< HEAD
    <div className="dashboard">
      <h1>LMS Analytics Dashboard</h1>
      {overview && <OverviewCards data={overview} />}
      <CourseTable data={courses} />
      <AssessmentTable data={assessments} />
      <StudentTable data={students} />
      <RecentAttempts data={recentAttempts} />
    </div>
=======
    <>
      <AppRoutes/>
    </>
>>>>>>> b0cc7eb311991362938ed087c7ff9f4dcad9f02a
  );
}

export default App;
