import '../../styles/form.css';
import { useState } from "react";
import { CreateSectionDto } from "../../types/lms";
import { createSection } from "../../api/sectionapi";

interface Props {
  moduleId: string;
  onSuccess: () => void;
}

const SectionForm = ({ moduleId, onSuccess }: Props) => {
  const [section_title, setTitle] = useState("");
  const [section_content, setContent] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data: CreateSectionDto = {
      section_title,
      module_id:moduleId,
    };

    await createSection(data);
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Section</h2>
      <input
        placeholder="Section Title"
        value={section_title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Section Content"
        value={section_content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
};

export default SectionForm;