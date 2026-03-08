import { useParams } from "react-router-dom";

type Course = {
  id: number;
  title: string;
  instructor: string;
  technology: string;
};

const courses: Course[] = [
  { id: 1, title: "React Basics", instructor: "Ram", technology: "React" },
  { id: 2, title: "Machine Learning", instructor: "Aasrith", technology: "Python" },
];

export default function CourseDetails() {
  const { courseId } = useParams();

  const course = courses.find((c) => c.id === Number(courseId));

  if (!course) {
    return <h2>Course not found</h2>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>{course.title}</h1>

      <p>
        <strong>Instructor:</strong> {course.instructor}
      </p>

      <p>
        <strong>Technology:</strong> {course.technology}
      </p>

      <button
  style={{ marginTop: "20px", padding: "10px" }}
  onClick={() => alert(`Enroll clicked for course ${course.id}`)}
>
  Enroll
</button>
    </div>
  );
}