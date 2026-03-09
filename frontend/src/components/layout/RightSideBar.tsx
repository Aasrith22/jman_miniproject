import '../../styles/rightsidebar.css'

import { Section } from "../../types/lms";

interface props {
    sections : Section[];
    onAddSection : () => void;
}

const rightsidebar = ({sections,onAddSection} : props) => {
    return(
        <aside>
            <h3>Sections</h3>
            {sections.map((s) => (
                <div key={s.section_id} onClick={onAddSection}>{s.section_title}</div>
            ))}
            <button onClick={onAddSection}>Add Section</button>
        </aside>
    )
}
export default rightsidebar;