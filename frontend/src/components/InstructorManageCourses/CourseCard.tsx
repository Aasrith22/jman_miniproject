import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteCourse, getCourseStats } from "../../api/courseapi";
import CourseStatsModal from "./CourseStatsModal";

export default function CourseCard({ course, onDelete }: any) {

  const navigate = useNavigate();
  const [stats, setStats] = useState<any>(null);

  const handleDelete = async () => {
    await deleteCourse(course.course_id);

    // remove from UI
    onDelete(course.course_id);
  };

  const handleStats = async () => {
    const data = await getCourseStats(course.course_id);
    setStats(data);
  };

  const handleEdit = () => {
    navigate(`/coursemodule/${course.course_id}`);
  };

  return (
    <div className="course-card">

      <h3>{course.course_name}</h3>

      <p>Technology: {course.technology}</p>

      <p>Students: {course.enrolled_students.length}</p>

      <div>

        <button onClick={handleEdit}>
          Edit
        </button>

        <button onClick={handleDelete}>
          Delete
        </button>

        <button onClick={handleStats}>
          Statistics
        </button>

      </div>

      {stats && <CourseStatsModal stats={stats} />}

    </div>
  );
}