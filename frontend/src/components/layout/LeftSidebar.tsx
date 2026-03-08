import { CourseModule, Assessment } from "../../types/lms";
import '../../styles/leftsidebar.css'
interface props {
    modules : CourseModule[];
    onSelectModule : (module : CourseModule) => void;
    onAddModule : () => void
    assessment : null | Assessment;
    onCreateAssessment: ()=>void;
    onDeleteAssessment: (id:string) => void;
}

const leftsidebar = ({modules,onSelectModule,onAddModule,assessment,onCreateAssessment,onDeleteAssessment}:props) =>{
    return(
        <aside>
            <h3>Modules</h3>

            {modules.map((m) => (
                <div key={m.module_id} onClick={() => onSelectModule(m)}>{m.module_title}</div>
            ))}
            <button onClick={onAddModule}>Add Module</button>

            <hr/>

            <h3>Assessments</h3>

            {assessment ? (
                <div className="assessment-row">
                    <span>{assessment.title}</span>
                    <button onClick={() => onDeleteAssessment(assessment.assessment_id)}>Delete</button>
                </div>
      ) : (
        <button onClick={onCreateAssessment}>Create Assessment</button>
      )}
        </aside>
    )
}

export default leftsidebar