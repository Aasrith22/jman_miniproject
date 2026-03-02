import { CourseModule } from "../../types/lms";
import '../../styles/leftsidebar.css'
interface props {
    modules : CourseModule[];
    onSelectModule : (module : CourseModule) => void;
    onAddModule : () => void
}

const leftsidebar = ({modules,onSelectModule,onAddModule}:props) =>{
    return(
        <aside>
            <h3>Modules</h3>

            {modules.map((m) => (
                <div key={m.module_id} onClick={() => onSelectModule(m)}>{m.module_title}</div>
            ))}
            <button onClick={onAddModule}>Add Module</button>
        </aside>
    )
}

export default leftsidebar