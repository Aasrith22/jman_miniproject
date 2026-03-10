import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../../auth/useAuth';
import s from './CourseList.styles';

const API = 'http://localhost:3000';

type Course = {
  course_id: string;
  course_name: string;
  technology: string;
  instructor: { user_id: string; full_name: string };
  enrolled?: boolean;
};

export default function CourseList({ enrolledOnly = false }: { enrolledOnly?: boolean }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState('');
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);
  // live search: updates as the user types
  const [search, setSearch] = useState('');
  // track which card is hovered to apply inline hover styles
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  // wishlist functionality removed; token-only auth now
  const toggleLike = (_e: React.MouseEvent, _course: Course) => {
    /* no-op */
  };

  const getUserId = () => user?.sub; // JWT payload 'sub' is user id


  useEffect(() => { loadCourses(); }, [user]);

  async function loadCourses() {
    setLoading(true);
    setFetchError('');
    try {
      const uid = getUserId();
      const res = await axios.get(uid ? `${API}/courses?userId=${uid}` : `${API}/courses`);
      setCourses(res.data || []);
    } catch {
      setFetchError('Could not load courses. Make sure the backend is running on port 3000.');
    } finally {
      setLoading(false);
    }
  }

  async function handleEnrollClick(course: Course) {
    // navigate to nested enrollment route under /student
    navigate(`/student/enrollment/${course.course_id}`, { state: { course } });
  }

  async function toggleEnroll(uid: string, course: Course) {
    try {
      if (course.enrolled) {
        await axios.post(`${API}/courses/unroll`, { user_id: uid, course_id: course.course_id });
        showToast('You have successfully deregistered.', 'error');
      } else {
        await axios.post(`${API}/courses/enroll`, { user_id: uid, course_id: course.course_id });
        showToast('You have successfully registered!', 'success');
      }
      setCourses(prev =>
        prev.map(c => c.course_id === course.course_id ? { ...c, enrolled: !c.enrolled } : c)
      );
    } catch (err) {
      console.error(err);
    }
  }

  async function handleDeregister(course: Course) {
    const uid = getUserId();
    if (!uid) return;
    setOpenMenuId(null);
    await toggleEnroll(uid, course);
  }

  const displayCourses = enrolledOnly ? courses.filter(c => c.enrolled) : courses;

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return displayCourses;
    return displayCourses.filter(c =>
      c.course_name.toLowerCase().includes(q) ||
      c.technology.toLowerCase().includes(q) ||
      c.instructor.full_name.toLowerCase().includes(q)
    );
  }, [displayCourses, search]);

  if (loading) return <div style={s.centered}>Loading courses...</div>;
  if (fetchError) return <div style={{ ...s.centered, color: '#ef4444' }}>{fetchError}</div>;

  return (
    <div style={s.page}>
      {/* Toast */}
      {toast && (
        <div
          style={{ ...s.toast, background: toast.type === 'success' ? 'linear-gradient(90deg,#16a34a,#15803d)' : 'linear-gradient(90deg,#dc2626,#b91c1c)' }}
          onClick={() => setToast(null)}
        >
          <span>{toast.msg}</span>
          <span style={s.toastClose}>×</span>
        </div>
      )}
      <div style={s.headerRow}>
        <h1 style={s.pageTitle}>{enrolledOnly ? 'My Enrolled Courses' : 'Browse Courses'}</h1>
        <div style={s.searchBar}>
          <input
            aria-label="Search courses"
            placeholder="Search"
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={s.searchInput}
          />
        </div>
      </div>

  {enrolledOnly && filtered.length === 0 && !loading && (
        <div style={s.centered}>
          <p>You haven't enrolled in any courses yet.</p>
          <button style={s.enrollBtn} onClick={() => navigate('/student/my-courses')}>Browse Courses</button>
        </div>
      )}

      <div style={s.grid}>
        {filtered.map(course => (
          <div
            key={course.course_id}
            style={{
              ...s.card,
              transform: hoveredCard === course.course_id ? 'translateY(-6px)' : undefined,
              boxShadow: hoveredCard === course.course_id ? '0 12px 40px rgba(79,70,229,0.18)' : (s.card as any).boxShadow,
            }}
            className="course-card"
            onClick={() => setOpenMenuId(null)}
            onMouseEnter={() => setHoveredCard(course.course_id)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div style={s.cardTop}>
              <span style={s.techBadge}>{course.technology}</span>
              {course.enrolled && <span style={s.enrolledBadge}>✓ Enrolled</span>}
            </div>
            <h3 style={s.courseName}>{course.course_name}</h3>
            <p style={s.instructorText}>by {course.instructor.full_name}</p>

            {course.enrolled ? (
              <div style={s.actionRow}>
                <button style={s.registeredBtn} className="registered-btn" disabled>Registered</button>
                <div style={{ position: 'relative' }}>
                  <button
                    style={s.dotsBtn}
                    className="dots-btn"
                    onClick={e => { e.stopPropagation(); setOpenMenuId(openMenuId === course.course_id ? null : course.course_id); }}
                    title="Options"
                  >⋮</button>
                  {openMenuId === course.course_id && (
                    <div style={s.dropdown} onClick={e => e.stopPropagation()}>
                      <button style={s.dropdownItem} className="deregister-item" onClick={() => handleDeregister(course)}>
                        Deregister
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div style={s.actionRow}>
                <button
                  style={{
                    ...s.enrollBtn,
                    transform: hoveredCard === course.course_id ? 'translateY(-3px)' : undefined,
                    boxShadow: hoveredCard === course.course_id ? '0 8px 24px rgba(79,70,229,0.28)' : (s.enrollBtn as any).boxShadow,
                  }}
                  className="enroll-btn"
                  onClick={() => handleEnrollClick(course)}
                >
                  Enroll Now
                </button>

              </div>
            )}
          </div>
        ))}
      </div>


    </div>
  );
}
