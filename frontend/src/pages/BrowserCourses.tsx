import CourseCard from "../components/CourseCard";

export default function BrowseCourses() {

  const courses = [
    { id: 1, title: "React Basics", instructor: "Ram", technology: "React" },
    { id: 2, title: "Machine Learning", instructor: "Aasrith", technology: "Python" }
  ];

  return (
    <div>
      <h1>Browse Courses</h1>
      

      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}

    </div>
  );
}