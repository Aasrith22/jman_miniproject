import "../../styles/questionform.css";
import { useState } from "react";
import { CreateQuestionDTO, CreateQuestionChoiceDTO } from "../../types/lms";

interface Props {
  onAdd: (q: CreateQuestionDTO) => void;
  assessmentId: string;
}

const QuestionForm = ({ onAdd, assessmentId }: Props) => {

  const [questionText, setQuestionText] = useState("");
  const [options, setOptions] = useState<string[]>(["", "", "", ""]);
  const [correctIndex, setCorrectIndex] = useState(0);

  const handleSubmit = () => {

    if (!questionText.trim()) {
      alert("Enter question text");
      return;
    }

    if (options.some(opt => opt.trim() === "")) {
      alert("All options must be filled");
      return;
    }

    const choices: CreateQuestionChoiceDTO[] = options.map((opt, i) => ({
      choice_text: opt,
      is_correct: i === correctIndex
    }));

    const newQuestion: CreateQuestionDTO = {
      question_text: questionText,
      question_type: "MULTIPLE_CHOICE",
      points: 1,
      fk_assessment_id: assessmentId,
      choices
    };

    onAdd(newQuestion);

    setQuestionText("");
    setOptions(["", "", "", ""]);
    setCorrectIndex(0);
  };

  return (
    <main className="question-form">

      <h2>Add Question</h2>

      <input
        placeholder="Question Text"
        value={questionText}
        onChange={(e) => setQuestionText(e.target.value)}
      />

      {options.map((opt, i) => (
        <input
          key={i}
          placeholder={`Option ${i + 1}`}
          value={opt}
          onChange={(e) => {
            const newOptions = [...options];
            newOptions[i] = e.target.value;
            setOptions(newOptions);
          }}
        />
      ))}
      <h2>Select Correct Option</h2>
      <select
        value={correctIndex}
        onChange={(e) => setCorrectIndex(Number(e.target.value))}
      >
        <option value={0}>Correct: Option 1</option>
        <option value={1}>Correct: Option 2</option>
        <option value={2}>Correct: Option 3</option>
        <option value={3}>Correct: Option 4</option>
      </select>

      <button onClick={handleSubmit}>Add Question</button>

    </main>
  );
};

export default QuestionForm;