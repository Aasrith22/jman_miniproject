import '../../styles/form.css';
import { useState } from "react";
import { CreateAssessmentDTO } from "../../types/lms";
import { createAssessment } from "../../api/assessmentapi";
import { useNavigate, useParams } from "react-router-dom";


const CourseForm = () => {

    const {courseId} = useParams<{courseId:string}>();
    const[title, setTitle] = useState("");
    const[description,setDescription] = useState("");
    const[passingscore,setPassingScore] = useState<number>(50);
    const navigate = useNavigate();
    const handleSubmit = async(e : React.FormEvent) => {
        e.preventDefault();
        if (!courseId) {
            alert("Course ID missing in URL");
            return;
        }
        console.log(`Course Id : ${courseId}`);
        const data : CreateAssessmentDTO = {
            title,
            description,
            passing_score: passingscore,
            fk_course_id : courseId,
        }
        const res = await createAssessment(data)
        console.log(`Assessment Id : ${res.assessment_id}`);
        navigate(`/assessment/${res.assessment_id}`)
    }
    return(
        <form onSubmit={handleSubmit}>
            <h2>Create Assessment</h2>
            <input placeholder="Assessment Title" value={title} onChange={(e) => setTitle(e.target.value)}/>
            <input placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)}/>
            <input placeholder='Passing Score (*/100)' value={passingscore} onChange={(e) => setPassingScore(Number(e.target.value))}/>
            <button type="submit">Create</button>
        </form>
    )
}

export default CourseForm;