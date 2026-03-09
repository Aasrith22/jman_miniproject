import '../../styles/form.css';
import { useState } from "react";
import { CreateModuleDto } from "../../types/lms";
import { createModule } from "../../api/moduleapi";

interface Props {
  courseId: string;
  onSuccess: () => void;
}

const ModuleForm = ({ courseId, onSuccess }: Props) => {
    console.log(courseId);
     
  const [module_title, setTitle] = useState("");
  const [module_description, setDesc] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data: CreateModuleDto = {
      module_title,
      module_description,
      course_id : courseId
    };
    console.log(data.course_id);
    await createModule(data);
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Module</h2>
      <input
        placeholder="Module Title"
        value={module_title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Module Description"
        value={module_description}
        onChange={(e) => setDesc(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
};

export default ModuleForm;