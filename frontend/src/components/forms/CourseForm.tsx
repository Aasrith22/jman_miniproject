import '../../styles/form.css';
import { useState } from "react";
import { Course, CreateCourseDTO } from "../../types/lms";
import { createCourse } from "../../api/courseapi";
import { useNavigate, useParams } from "react-router-dom";


const CourseForm = () => {

    const {instructorId} = useParams<{instructorId:string}>();
    const[course_name, setCourseName] = useState("");
    const[technology,setTechnology] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async(e : React.FormEvent) => {
        e.preventDefault();
        if (!instructorId) {
            alert("Instructor ID missing in URL");
            return;
        }
        console.log(`Instructor Id : ${instructorId}`);
        const data : CreateCourseDTO = {
            course_name,
            technology,
            fk_instructor_id : instructorId,
        }
        const res = await createCourse(data)
        console.log(`Course Id : ${res.course_id}`);
        navigate(`/coursemodule/${res.course_id}`)
    }
    return(
        <form onSubmit={handleSubmit}>
            <h2>CreateCourse</h2>
            <input placeholder="Course Name" value={course_name} onChange={(e) => setCourseName(e.target.value)}/>
            <input placeholder="Technology" value={technology} onChange={(e) => setTechnology(e.target.value)}/>
            <button type="submit">Create</button>
        </form>
    )
}

export default CourseForm;