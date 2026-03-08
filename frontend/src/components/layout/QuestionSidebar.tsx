// import '../../styles/questionsidebar.css'
// import { Questions } from "../../types/lms"

// interface props{
//     questions: Questions[],
//     onAddQuestion: ()=> void,
// }

// const QuestionSidebar = ({questions,onAddQuestion} : props) => {
//     return(
//         <aside className="question-sidebar">
//             <h3>Questions</h3>

//             {questions.map((q) => (
//                 <div key={q.question_id}>
//                     {q.question_text.slice(0,40)}
//                 </div>
//             ))}

//             <button onClick={onAddQuestion}>Add Question</button>
//         </aside>
//     )
// }

// export default QuestionSidebar;

import '../../styles/questionsidebar.css'
import { Questions } from "../../types/lms"

interface Props {
  questions: Questions[],
  onAddQuestion: () => void,
  onDeleteQuestion: (id: string) => void
}

const QuestionSidebar = ({questions, onAddQuestion, onDeleteQuestion}: Props) => {

  return (
    <aside className="question-sidebar">

      <h3>Questions</h3>

      {questions.map((q) => (
        <div className="question-item" key={q.question_id}>

          <span className="question-text">
            {q.question_text.slice(0, 40)}
          </span>

          <button
            className="delete-btn"
            onClick={() => onDeleteQuestion(q.question_id)}
          >
            🗑
          </button>

        </div>
      ))}

      <button onClick={onAddQuestion}>Add Question</button>

    </aside>
  )
}

export default QuestionSidebar