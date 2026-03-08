import { Link } from "react-router-dom";

type Course = {
  id: number;
  title: string;
  instructor: string;
  technology: string;
};

export default function CourseCard({ course }: { course: Course }) {
  return (
    <div style={{ border: "1px solid #ccc", padding: "15px", margin: "10px" }}>
      <h3>{course.title}</h3>
      <p>Instructor: {course.instructor}</p>
      <p>Technology: {course.technology}</p>

      <Link to={`/courses/${course.id}`}>
        <button>View Course</button>
      </Link>
    </div>
  );
}