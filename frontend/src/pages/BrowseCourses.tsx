import CourseCard from "../components/CourseCard";

export default function BrowseCourses() {

  const courses = [
    { id: 1, title: "React Basics", instructor: "Ram", technology: "React" },
    { id: 2, title: "Machine Learning", instructor: "Aasrith", technology: "Python" }
  ];

  return (
  <div style={{ padding: "20px" }}>
    <h1>Browse Courses</h1>

    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
      gap: "20px",
      marginTop: "20px"
    }}>
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  </div>
);
}