import { useEffect, useState } from "react";
import { getInstructorCourses } from "../../api/courseapi";
import CreateCourseButton from "./CreateCourseButton";
import SearchBar from "./SearchBar";
import CourseCard from "./CourseCard";

export default function InstructorDashboard() {

  const [courses, setCourses] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  const instructorId = localStorage.getItem("user_id");

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    if (!instructorId) return;

    const data = await getInstructorCourses(instructorId);
    setCourses(data);
  };

  const handleDeleteCourse = (courseId: string) => {
    setCourses((prev) =>
      prev.filter((course) => course.course_id !== courseId)
    );
  };

  const filtered = courses.filter((c) =>
    c.course_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>

      <CreateCourseButton instructorId={instructorId} />

      <SearchBar search={search} setSearch={setSearch} />

      {filtered.map((course) => (
        <CourseCard
          key={course.course_id}
          course={course}
          onDelete={handleDeleteCourse}
        />
      ))}

    </div>
  );
}