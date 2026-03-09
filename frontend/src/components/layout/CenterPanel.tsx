import "../../styles/centerpanel.css";

import { CourseModule } from "../../types/lms";
import ModuleForm from "../forms/ModuleForm";
import SectionForm from "../forms/SectionForm";

interface Props {
  activeForm: "addModule" | "addSection" | null;
  courseId: string;
  selectedModule: CourseModule | null;
  onSuccess: () => void;
}

const CenterPanel = ({
  activeForm,
  courseId,
  selectedModule,
  onSuccess,
}: Props) => {
  return (
    <main className="center-panel">
      {!activeForm && (
        <div className="placeholder">
          <h2>Select an action</h2>
          <p>Add a module or select a module to add sections</p>
        </div>
      )}

      {activeForm === "addModule" && (
        <ModuleForm courseId={courseId} onSuccess={onSuccess} />
      )}

      {activeForm === "addSection" && !selectedModule && (
        <div className="placeholder">
          <h2>Select a module first</h2>
        </div>
      )}

      {activeForm === "addSection" && selectedModule && (
        <SectionForm
          moduleId={selectedModule.module_id}
          onSuccess={onSuccess}
        />
      )}
    </main>
  );
};

export default CenterPanel;