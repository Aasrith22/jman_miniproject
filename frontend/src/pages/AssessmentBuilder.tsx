import '../styles/assessmentbuilder.css'

import { useState, useEffect } from "react";
import { Questions, CreateQuestionDTO } from "../types/lms";
import QuestionSidebar from "../components/layout/QuestionSidebar";
import QuestionForm from "../components/forms/QuestionForm";
import { useParams } from "react-router-dom";
import { createQuestion, fetchQuestions, deleteQuestion } from "../api/questionsapi";

const AssessmentBuilder = () => {

  const { assessmentId } = useParams<{ assessmentId: string }>();

  const [questions, setQuestions] = useState<Questions[]>([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {

    if (!assessmentId) return;

    const loadQuestions = async () => {
      const data = await fetchQuestions(assessmentId);
      setQuestions(data);
    };

    loadQuestions();

  }, [assessmentId]);

  if (!assessmentId) {
    return <div>Assessment ID not found</div>;
  }

  const addQuestion = async (q: CreateQuestionDTO) => {

    const savedQuestion = await createQuestion(q);

    setQuestions(prev => [...prev, savedQuestion]);
    setShowForm(false);
  };

  const handledeletequestion = async (qid : string) => {
    await deleteQuestion(qid);
    setQuestions(prev =>
    prev.filter(q => q.question_id !== qid)
  );
  }
  return (
  <div className="assessment-layout">

    <QuestionSidebar
      questions={questions}
      onAddQuestion={() => setShowForm(true)}
      onDeleteQuestion={handledeletequestion}
    />

    <div className="assessment-content">

      {showForm ? (
        <QuestionForm
          onAdd={addQuestion}
          assessmentId={assessmentId}
        />
      ) : (
        <div className="assessment-placeholder">
          Click "Add Question" to create a question
        </div>
      )}

    </div>

  </div>
);
};

export default AssessmentBuilder;