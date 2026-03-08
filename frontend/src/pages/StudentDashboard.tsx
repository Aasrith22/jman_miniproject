import { Link } from "react-router-dom";

export default function StudentDashboard() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Student Dashboard</h1>

      <p>Welcome! Choose an option below.</p>

      <div style={{ marginTop: "20px" }}>
        <Link to="/courses">
          <button style={{ padding: "10px 20px", cursor: "pointer" }}>
            Browse Courses
          </button>
        </Link>
      </div>
    </div>
  );
}