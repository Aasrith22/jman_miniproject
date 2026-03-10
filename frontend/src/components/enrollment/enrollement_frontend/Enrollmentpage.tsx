import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../../auth/useAuth";
import s from './enroll.style'
const API = "http://localhost:3000";

type Section = {
  section_id: string;
  section_title: string;
  section_content?: string;
};

type Module = {
  module_id: string;
  module_title: string;
  module_description: string;
  sections: Section[];
};

type CourseDetail = {
  course_id: string;
  course_name: string;
  technology: string;
  created_at: string;
  instructor: { user_id: string; full_name: string };
  modules: Module[];
};

function EnrollmentPage() {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [course, setCourse] = useState<CourseDetail | null>(null);
  // note: full_name not used by auth endpoint but retained for UI
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set());

  // Fetch full course details with modules & sections
  useEffect(() => {
    if (!courseId) return;
    setLoading(true);
    axios
      .get(`${API}/courses/${courseId}`)
      .then((res) => setCourse(res.data))
      .catch(() => setError("Course not found."))
      .finally(() => setLoading(false));
  }, [courseId]);

  const toggleModule = (moduleId: string) => {
    setExpandedModules((prev) => {
      const next = new Set(prev);
      next.has(moduleId) ? next.delete(moduleId) : next.add(moduleId);
      return next;
    });
  };

  const handleEnroll = async () => {
    setError("");

    if (!courseId) {
      setError("Invalid course.");
      return;
    }

    
    if (!user) {
      navigate("/login");
      return;
    }

    setEnrolling(true);
    try {
      const uid = (user as any).sub;
      if (!uid) throw new Error("Unable to determine user id");

      await axios.post(`${API}/courses/enroll`, {
        user_id: uid,
        course_id: courseId || "",
      });

      setSuccess(true);
    } catch (err: any) {
      setError("Enrollment failed. Please try again.");
      console.error(err);
    } finally {
      setEnrolling(false);
    }
  };

  /* ---- Loading state ---- */
  if (loading) {
    return (
      <div style={s.page}>
        <p style={{ color: "#6b7280", fontSize: 18 }}>Loading course details...</p>
      </div>
    );
  }

  /* ---- Success state ---- */
  if (success) {
    return (
      <div style={s.page}>
        <div style={s.successCard}>
          <div style={s.successIcon}>✓</div>
          <h2 style={s.successTitle}>Enrollment Successful!</h2>
          <p style={s.successText}>
            You have been enrolled in <strong>{course?.course_name}</strong>.
          </p>
          <button style={s.primaryBtn} onClick={() => navigate("/student/enroll")}>
            ← Back to Courses
          </button>
        </div>
      </div>
    );
  }

  /* ---- Main page ---- */
  return (
    <div style={s.page}>
      {!course ? (
        <p style={{ color: "#ef4444", fontSize: 16 }}>Course not found.</p>
      ) : (
        <div style={s.wrapper}>
          {/* ====== LEFT: Course Details ====== */}
          <div style={s.detailsPanel}>
            {/* Header */}
            <div style={s.courseHeader}>
              <span style={s.techBadge}>{course.technology}</span>
              <h1 style={s.courseName}>{course.course_name}</h1>
              <p style={s.instructorText}>by {course.instructor.full_name}</p>
              <p style={s.dateText}>
                Created {new Date(course.created_at).toLocaleDateString()}
              </p>
            </div>

            {/* Course Stats */}
            <div style={s.statsRow}>
              <div style={s.statBox}>
                <span style={s.statNum}>{course.modules.length}</span>
                <span style={s.statLabel}>Modules</span>
              </div>
              <div style={s.statBox}>
                <span style={s.statNum}>
                  {course.modules.reduce((n, m) => n + m.sections.length, 0)}
                </span>
                <span style={s.statLabel}>Sections</span>
              </div>
            </div>

            {/* (Enroll button removed from here; moved below course content) */}

            {/* Modules & Sections */}
            <h3 style={s.sectionHeading}>Course Content</h3>

            {course.modules.length === 0 ? (
              <p style={s.emptyText}>No modules added yet.</p>
            ) : (
              course.modules.map((mod, idx) => (
                <div key={mod.module_id} style={s.moduleCard}>
                  <div
                    style={s.moduleHeader}
                    onClick={() => toggleModule(mod.module_id)}
                  >
                    <div>
                      <span style={s.moduleIndex}>Module {idx + 1}</span>
                      <h4 style={s.moduleTitle}>{mod.module_title}</h4>
                      <p style={s.moduleDesc}>{mod.module_description}</p>
                    </div>
                    <span style={s.chevron}>
                      {expandedModules.has(mod.module_id) ? "▲" : "▼"}
                    </span>
                  </div>

                  {expandedModules.has(mod.module_id) && (
                    <div style={s.sectionsWrapper}>
                      {mod.sections.length === 0 ? (
                        <p style={s.emptyText}>No sections yet.</p>
                      ) : (
                        mod.sections.map((sec, si) => (
                          <div key={sec.section_id} style={s.sectionItem}>
                            <span style={s.sectionBullet}>{si + 1}</span>
                            <span style={s.sectionName}>{sec.section_title}</span>
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </div>
              ))
            )}

            {/* Register button placed below course content */}
            <div style={{ marginTop: 18, textAlign: "center" }}>
              {error && <p style={s.errorText}>{error}</p>}
              <button
                style={{ ...s.primaryBtn, padding: "12px 22px", width: 200 }}
                onClick={handleEnroll}
                disabled={enrolling}
                onMouseEnter={() => { /* optional hover handled by CSS inlined here if needed */ }}
              >
                {enrolling ? "Enrolling..." : "Register"}
              </button>
            </div>
          </div>

          {/* ====== RIGHT: (removed interactive registration form) ====== */}
          {/* Instead, show an Enroll button under the course header/stats */}
        </div>
      )}
    </div>
  );
}

export default EnrollmentPage;

/* ---------- Styles ---------- */
